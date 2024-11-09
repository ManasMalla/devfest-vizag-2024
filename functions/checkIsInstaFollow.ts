import axios from "axios";

export const checkIsInstaFollow = async (targetUserName : string) => {
    console.log('checkIsinsta Follow function is beign called!');

    return new Promise((resolve, reject) => {
        const interval = setInterval( async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/instagram/followers?userID=${targetUserName}`);
                const users = response.data.users;
                console.log("users found -->", response.data.users);
                const usersExists = users.some((user: { username: string; }) => user.username === targetUserName);

                if(usersExists){
                    console.log(targetUserName, " is following gdg_vizag");
                    clearInterval(interval);
                    resolve(true);
                }
            } catch (error) {
                console.log("Got error while checking user followed or not.",error);
            }
        }, 15000);

        setTimeout(() => {
            clearInterval(interval);
            console.log("Stopped checking after 1 minute.");
            resolve(false);
        }, 60000*5);
    })
    
};
