import { useState } from "react";
import contacts from "../src/contacts.json";

import "./App.css";

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5));
 console.log(contactList)

const handleAddContact = () => {
console.log("añadiendo contacto")

let randomContact = contacts[Math.floor(Math.random() * contacts.length)]
console.log(randomContact)

let repeteadContact = contactList.find((eachContact)=> {

  if (eachContact.id === randomContact.id) {
    return true
  }

})
if (repeteadContact !== undefined) {
  handleAddContact()
  return
}
 

setContactList([randomContact,...contactList])
}

const handleSortByPopularity = () => {
console.log("organizando por popularidad")

let clone = JSON.parse(JSON.stringify(contactList))
clone.sort((contact1,contact2)=> {

  return contact1.popularity > contact2.popularity ? -1 : 1
})

setContactList(clone)

}

const handleSortByName = () => {
  console.log("organizando por popularidad")
  
  let clone = JSON.parse(JSON.stringify(contactList))
  clone.sort((contact1,contact2)=> {
  
    return contact1.name > contact2.name ? 1 : -1
  })
  
  setContactList(clone)
}

const handleDeleteContact = (id) => {
console.log("borrando un contacto", id)


let update = contactList.filter((contact) => {
  return contact.id === id? false : true
})
setContactList(update)

}
  return (
    <div className="App">
      <h1>Contacts</h1>
      <button onClick={handleAddContact}>Add Random Contact</button>
      <button onClick={handleSortByPopularity}>Sort by popularity</button>
      <button onClick={handleSortByName}>Sort by Name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Oscar</th>
            <th>Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((eachContact) => {
            return (
            <tr key={eachContact.id}>
              <td>
                <img src={eachContact.pictureUrl} alt="" width="150px"/>
              </td>
              <td>{eachContact.name}</td>
              <td>{eachContact.popularity.toFixed(2)}</td>
             <td>{eachContact.wonOscar === true ? "🏆": null}</td>
             <td>{eachContact.wonEmmy === true ? "🌟": null}</td>
             <td><button onClick={() => handleDeleteContact(eachContact.id)}>Delete</button></td>


            </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
