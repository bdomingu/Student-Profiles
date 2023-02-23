import React, {useEffect, useState} from "react";




export default function Profiles ({students, setStudents, searchKeyword, name}) {


const [search, setSearch] = useState('');
const [searchTags, setSearchTags] = useState('');
const [tags, setTags] = useState([]);
const [clicked, setClicked] = useState(null);
const [filteredTags, setFilteredTags] = useState([])


const addTags = (studentId, e) => {
    if (e.key === 'Enter' && e.target.value){
        setTags([...tags,{studentId, value:e.target.value}]);
        e.target.value = '';
    }
    
}

useEffect(() => {
    setFilteredTags(
        tags.filter((tag => {
            console.log(tag.value)
            return searchTags.toLowerCase() === '' ? tag :
            tag.value.includes(searchTags)
        }))
    )
   console.log(filteredTags)
      

}, [searchTags])


const toggle = (index) => {
    if (clicked === index){
        return setClicked(null)
    }
    setClicked(index)
    
}



return (
    <><div>
        <ul className="searchSeparator">
            <li>
                <input
                className='textArea'
                type='text'
                placeholder='Search by name' 
                onChange={(e) => setSearch(e.target.value)}
                />
            </li>
            <li>
                <input
                className='textArea'
                type='text'
                value = {searchTags}
                placeholder='Search by tag' 
                onChange={(e) => setSearchTags(e.target.value)}
                />
            </li>
        </ul>
    </div><>
            {students.filter((student) =>{ 
                return search.toLowerCase() === '' ? student : 
                student.firstName.toLowerCase().includes(search) || student.lastName.toLowerCase().includes(search)
            }).map((student, index) => {

                const grades = student.grades;
                const arrOfGrades = grades.map(str => {
                    return Number(str);
                });
                
                var sum = 0;
                for (var number of arrOfGrades) {
                    sum += number;
                }
                const average = sum / arrOfGrades.length;


        return (

            <div>
                <ul  className="separator">
              
                   <li key={student.id}>
                    
                    <img className="img" src={student.pic} />

                    <div className="accordion" onClick={() => toggle(index)} key={index}>
                    <span>{clicked === index ? '-' : '+'}</span>
                    </div>
                    <div className="info">
                            <h2>{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h2>
                            <p>Email: {student.email}</p>
                            <p>Company: {student.company}</p>
                            <p>Skill: {student.skill}</p>
                            <p>Average: {average}%</p>
                        </div> 

                    
                       {clicked === index ?(
                    <>
                        <br></br>
                        <p>Test 1: {arrOfGrades[0]}%</p>
                        <p>Test 2: {arrOfGrades[1]}%</p>
                        <p>Test 3: {arrOfGrades[2]}%</p>
                        <p>Test 4: {arrOfGrades[3]}%</p>
                        <p>Test 5: {arrOfGrades[4]}%</p>
                        <p>Test 6: {arrOfGrades[5]}%</p>
                        <p>Test 7: {arrOfGrades[6]}%</p>
                        <p>Test 8: {arrOfGrades[7]}%</p>
                    </>
                    ): null}
                      
                   
                    
            
                     <div>   
                    <ul className="tags">
                        {(tags.filter(tags => tags.studentId === student.id).map((tags) => {
                            // console.log(tag.value)
                            return <li className="tag"  key={index}>
                            <span>{tags.value}</span>    
                        </li>
                        } 
                         ))}
                     </ul>
                        <br></br>
                            <input
                            className="tag-input"
                            type="text"
                            placeholder="Add a tag"
                            onKeyPress={addTags.bind(this,student.id)}
                             /> 
                        
                    </div> 
                    
                    </li>
                </ul>
            </div>

        );
        })}
        </></>  
)      
        
    
}
