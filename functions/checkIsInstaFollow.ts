import axios from "axios";

export const checkIsInstaFollow = async (targetUserName : string) => {
    console.log('checkIsinsta Follow function is beign called!');

    try {
        const response = await axios.get(`http://localhost:4000/api/instagram/followers?userID=${targetUserName}`);
        const users = response.data.users;
        console.log("users found -->", response.data.users);
        const usersExists = users.some((user: { username: string; }) => user.username === targetUserName);

        if(usersExists){
            alert("congrats user is following");
        }
    } catch (error) {
        console.log("Got error while checking user followed or not.",error);
    }
    
};
