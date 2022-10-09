import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
	const [allCountries, setAllCountries] = useState([])
	const [filteredC, setFilteredC] = useState([])
	// const [search, setSearch] = useState('')
	const [total, setTotal] = useState(0)


	const getCountriesData = () => {
		const url = 'https://restcountries.com/v3.1/all'
		axios
			.get(url)
			.then(response => {
				setAllCountries(response.data)
				console.log('You can begin your search now!')
			})
	}

	useEffect(getCountriesData, [])

	const updateSearch = (e) => {
		let value = e.target.value.toLowerCase()
		// setSearch(value)

		if (value == '') {
			setTotal(0)
			setFilteredC([])
			return
		}

		let filCountries = allCountries.filter(country => {
			return (country.name.common.toLowerCase().startsWith(value))
		})
		setTotal(filCountries.length)
		setFilteredC(filCountries)
	}

	return (
		<div>
			<Header text="Search for informations about Countries" />
			<p>Find Countries: 
				<input onChange={updateSearch} type="text" /> 
			</p>
			<RenderCountries total={total} filteredC={filteredC}  />
			<DisplayOnlyOne country={filteredC} />
			<About />
			
		</div>
	)
}

const Header = ({ text }) => <h1>{text}</h1>

const About = () => {
	return (
		<div>
			<h4>React App created by <a href="https://github.com/kcnabin" target='_blank' >Nabin KC</a></h4>
			<p>Click <a href="https://github.com/kcnabin/data-for-countries">here</a> to view source code</p>
		</div>
	)
}

const RenderCountries = ({ total, filteredC }) => {
	// let clickedCountry
	// if (filteredC.length == 1) {
	// 	return <p>Result: 1 country </p>
	// }

	const handleClick = (e) => {
		let id = e.target.className
		document.getElementById(id).style.display = "block"
	}

	return (
		<div>
			<p>Result: {total} countries </p>
			{filteredC.map((country, i) => {
				return (
						<div key={i}> 
							{i+1}. {country.name.common} <button className={country.area} onClick={handleClick} >Show</button> 
							<RenderEachCountry country={country} id={country.area}  />
						</div>
				)
			})}
		</div>
		)
}

// const RenderinList = ({ result, id }) => {
// 	return (<RenderEachCountry country={result} id={id} />)
// }

const RenderEachCountry = ({ country, id }) => {
		let languages = Object.values(country.languages)

		return (
			<div style={{display: "none"}} id={id}>
				<h2>{country.name.official}</h2>
				<p>Capital: {country.capital }</p>
				<p>Area: {country.area }</p>
				<h4>Languages:</h4> 
					<ul> 
						{languages.map((lan, i) => {
						return <li key={i}>{lan}</li>
						})}
					</ul>
				<h4>Flag</h4>
				<img src={country.flags.png} alt="Country Flag" width="100px"/>
			</div>
		)
}

const DisplayOnlyOne = ({ country }) => {
	if (country.length > 1) {
		return 

	} else if (country.length == 1) {
		let id = country[0].area
		document.getElementById(id).style.display = "block"
		return <RenderEachCountry country={country[0]} id={id} />
	}
}

export default App;