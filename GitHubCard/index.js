

/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


axios.get('https://api.github.com/users/Lou34964')

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
.then(card =>{
  const mycard = CreateCard(card.data);
  document.querySelector('.cards').appendChild(mycard);
})

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get('https://api.github.com/users/Lou34964/followers')
.then(card =>{
  const followers = card.data;
  console.log(followers)
  followers.forEach(function(details){
    followersArray.push(details);
  })
})
.then( () =>{
  followersArray.forEach(function(details){
    axios.get(`https://api.github.com/users/${details.login}`)
    .then((card) =>{
      const userGitHub = CreateCard(card.data);
      document.querySelector('.cards').append(userGitHub);
    })
  })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function CreateCard(gitHubUser){
  //create elements for the user card
  const userCard = document.createElement('div'), // whole card
   userImg = document.createElement('img'),
   cardInfo = document.createElement('div'), // info section
   userName = document.createElement('h3'),
   userUName = document.createElement('p'),
   userLoc = document.createElement('p'),
   userProfile = document.createElement('p'),
   userProfileLink = document.createElement('a'),
   userFollowers = document.createElement('p'),
   userFollowing = document.createElement('p'),
   userBio = document.createElement('p');

  //add classes to each element accoringly
  userCard.classList.add('card');
  cardInfo.classList.add('card-info');
  userName.classList.add('name');
  userUName.classList.add('username');

  //add source to img
  userImg.setAttribute('src', gitHubUser.avatar_url);
  
  //add text content
  userLoc.textContent = `Location: ${gitHubUser.location}`;
  userProfile.textContent = 'Profile: ';
  userProfileLink.textContent = `${gitHubUser.html_url}`;
  userFollowers.textContent = `Followers: ${gitHubUser.followers}`;
  userFollowing.textContent = `Following: ${gitHubUser.following}`;
  userBio.textContent = `${gitHubUser.bio}`;
  userName.textContent = `${gitHubUser.name}`;
  userUName.textContent = `${gitHubUser.login}`;

  //structure Card
  userCard.appendChild(userImg);
  userCard.appendChild(cardInfo);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(userUName);
  cardInfo.appendChild(userLoc);
  cardInfo.appendChild(userProfile);
  userProfile.appendChild(userProfileLink);
  cardInfo.appendChild(userFollowers);
  cardInfo.appendChild(userFollowing);
  cardInfo.appendChild(userBio);

  //give hreff to profile
  userProfileLink.setAttribute('hreff', `${gitHubUser.html_url}`);
  
  //return card
  return userCard;
}
// const parentCards = document.querySelector('.cards');

//   .then(Response =>{
//     Response.data.fallowers_url.foreach(item =>{
//       const newCard = CreateCard(item.url);
//       parentCards.appendChild(newCard);
//     })
//   })

// const fallowersAPI = axios.get('https://api.github.com/users/Lou34964/followers')
// console.log(fallowersAPI);


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
