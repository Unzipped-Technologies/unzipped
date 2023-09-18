import React, { useEffect, useState } from 'react'
import IconComponent from '../ui/icons/IconComponent'

function MobileSearchFilter({ sortOptions, handleFilterOpenClose, sort, setSort, maxRate, skill, setMaxRate, setMinRate, minRate, handleSearch, freelancerSkillsList, setSkill }) {
    const [skillData, setSkillData] = useState([...freelancerSkillsList.slice(+freelancerSkillsList.length - 4, freelancerSkillsList.length)])
    const [skills, setSkills] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [userInput, setUserInput] = useState();
    const [uniqueSkills, setUniqueSkills] = useState(Object.values(
        freelancerSkillsList.reduce((accumulator, skill) => {
            accumulator[skill.skill] = skill;
            return accumulator;
        }, {})
    ))
    useEffect(() => {
        setSkill([...skills])
    }, [skills])
    const handleSuggestions = (event) => {
        const input = event.target.value.toLowerCase();
        setUserInput(input);
        // Filter skills based on user input
        var matchingSkills = uniqueSkills.filter(skill =>
            skill.skill.toLowerCase().includes(input)
        );

        if (!input) {
            setSuggestions([]);
        }
        else {
            setSuggestions([...matchingSkills]);
        }
    }

    const handleSuggestionClick = (value) => {
        setSkills((prev) => [...prev, value?.skill])
        setUserInput(value?.skill)
        setSkillData(prev => [...prev.filter((skill) => skill.skill !== value.skill), value]);
        setUniqueSkills(prev => [...prev.filter((skill) => skill.skill !== value.skill)])
    }

    return (
        <div style={{ backgroundColor: "white", color: "black" }}>

            <div className='py-3 px-2 d-flex align-items-center' style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)", gap: "11px" }}>
                <span onClick={() => { handleFilterOpenClose(false) }} style={{ cursor: "pointer" }}><IconComponent name='backArrow' width="20" height="20" viewBox="0 0 20 20" fill="black" /></span>
                <span style={{ fontWeight: "500", fontSize: "16px" }}>Filters</span>
            </div>
            <div style={{ padding: "0 25px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500", paddingLeft: "4px", marginTop: "21px" }}>Sort By</p>
                <select style={{ display: "block", width: "auto", border: "1px solid", height: "29px" }} value={sort} onChange={(e) => setSort(e.target.value)}>
                    {sortOptions.map((category, index) => (
                        <option key={index} value={category?.text}>
                            {category?.text}
                        </option>
                    ))}
                </select>
                <div className='d-flex justify-content-between align-items-center pt-3'>
                    <p style={{ fontSize: "16px", fontWeight: "500", paddingLeft: "4px" }}>Hourly Rate</p>
                    <p onClick={() => { setMaxRate(''); setMinRate('') }} style={{ fontSize: "12px", fontWeight: "500", color: "#0057FF" }}>CLEAR</p>
                </div>
                <div className='d-flex justify-content-between' style={{ gap: "20px" }}>
                    <div>
                        <p className='mb-0'>MIN</p>
                        <div className='d-flex align-items-center border border-dark'>
                            <span style={{ padding: "0 18px 0 9px", display: "flex", alignSelf: "center" }}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" ><path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" /></svg></span>
                            <input type='number' value={minRate} onChange={(e) => setMinRate(e.target.value)} style={{ margin: "0", border: "0", height: "29px" }}></input>
                        </div>
                    </div>
                    <div style={{ alignSelf: "flex-end" }}>
                        <p style={{ margin: "5px 0" }}>TO</p>
                    </div>
                    <div>
                        <p className='mb-0'>MAX</p>
                        <div className='d-flex align-items-center border border-dark'>
                            <span style={{ padding: "0 18px 0 9px", display: "flex", alignSelf: "center" }}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" ><path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" /></svg></span>
                            <input type='number' value={maxRate} onChange={(e) => setMaxRate(e.target.value)} style={{ margin: "0", border: "0", height: "29px" }}></input>
                        </div>
                    </div>

                </div>
                <div className='d-flex justify-content-between align-items-center pt-3'>
                    <p style={{ fontSize: "16px", fontWeight: "500", paddingLeft: "4px" }}>Skills</p>
                    <p style={{ fontSize: "12px", fontWeight: "500", color: "#0057FF" }} onClick={() => {
                        setUniqueSkills(Object.values(
                            freelancerSkillsList.reduce((accumulator, skill) => {
                                accumulator[skill.skill] = skill;
                                return accumulator;
                            }, {})
                        )); setSuggestions([]); setUserInput(''); setSkills([]); setSkillData([...freelancerSkillsList.slice(+freelancerSkillsList.length - 4, freelancerSkillsList.length)])
                    }}>CLEAR</p>
                </div>
                <div className='d-flex border border-dark px-3 py-2 mb-4' style={{ borderRadius: "7px", gap: "20px" }}>
                    <IconComponent name='footerSearch' width="24" height="20" viewBox="0 0 24 20" fill="black" />
                    <input placeholder='SEARCH' style={{ margin: "0", border: "0", height: "auto" }}
                        type="text"
                        value={userInput}
                        onChange={handleSuggestions}
                    />

                </div>
                <div>
                    <ul>
                        {suggestions?.map((skill, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(skill)}>
                                {skill?.skill}
                            </li>
                        ))}
                    </ul>
                </div>
                {skillData?.map((skill) => (
                    <div className='d-flex' style={{ lineHeight: "normal" }}>
                        {skills.includes(skill?.skill) ? <div onClick={() => { setSkills(skills.filter((data) => data !== skill?.skill)); setUniqueSkills(prev => [...prev, skill]); setSkillData((prev) => [...prev.filter((data) => data.skill !== skill.skill)]) }} style={{ maxWidth: "18px", minWidth: "18px", minHeight: "18px", maxHeight: "16px", border: "1px solid rgba(102, 102, 102, 0.70)", backgroundColor: "rgba(102, 102, 102, 0.1)", borderRadius: "2px" }}><span style={{ display: "flex", justifyContent: "center", fontSize: "smaller", fontWeight: "bolder" }}>✓</span></div>
                            : <div onClick={() => {
                                setSkills((prev) => [...prev, skill?.skill]); setUniqueSkills(prev => [...prev.filter((data) => data.skill !== skill.skill)])
                            }} style={{ maxWidth: "18px", minWidth: "18px", minHeight: "18px", maxHeight: "16px", border: "1px solid rgba(102, 102, 102, 0.20)", borderRadius: "2px" }}></div>}
                        <p className='mx-3'>{skill?.skill}</p>
                    </div>
                ))}
                <div className='pb-3' style={{ display: "grid" }}>
                    <button style={{ background: "#37DEC5", color: "white", fontSize: "16px", border: "0", padding: "10px 0px", fontWeight: "600" }} onClick={() => { handleFilterOpenClose(false); handleSearch() }}>SEE RESULTS</button>
                </div>
            </div>
        </div>
    )
}

export default MobileSearchFilter