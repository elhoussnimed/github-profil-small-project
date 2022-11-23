const userContainer = document.querySelector(".user");
const searchInput = document.querySelector("#searchUser");
const userImage = document.querySelector(".userImg img");
const userName = document.querySelector(".userName");
const userDescription = document.querySelector(".userDescription");
const followersNumber = document.querySelector(".followers .number");
const followingNumber = document.querySelector(".following .number");
const reposNumber = document.querySelector(".repos .number");
const reposContainer = document.querySelector(".reposNames");

// get user info with the api
async function getUserInfo(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (response) {
    userContainer.style.display = "flex";
    searchInput.value = "";
  }
  reposContainer.innerHTML = "";
  setUserInfo(data);
  getUserRepos(data);
}

// get user 5 repos and append them to the DOM
const getUserRepos = async (data) => {
  let reposUrl = data.repos_url;
  const response = await fetch(reposUrl);
  const reposData = await response.json();
  reposData.length = 5;
  reposData.forEach((rep) => {
    const repos = `<a class="repo" href="${rep.html_url}" target="_blank">${rep.name}</a>`;
    reposContainer.innerHTML += repos;
  });
};

// set user info to the Dom
const setUserInfo = (data) => {
  const { avatar_url, name, bio, followers, following, public_repos } = data;
  userImage.src = avatar_url;
  userName.innerHTML = name;
  userDescription.innerHTML = bio;
  followersNumber.innerHTML = followers;
  followingNumber.innerHTML = following;
  reposNumber.innerHTML = public_repos;
};

// press enter to get all the informations
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (searchInput.value === "") {
      return;
    }
    getUserInfo(`https://api.github.com/users/${searchInput.value}`);
  }
});
