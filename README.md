# DevFest 2024
Standard Web App for DevFest's Events. <br>
Show some ❤️ and star the repo to support the project

![asd](/public/thumbnail.png)

## Getting Started
1. Fork the repo
1. Setup Environment
    - Install [Node.js (v20 or above)](https://nodejs.org/en/download/)
1. Install project dependencies: `npm install` 
1. Compiles and hot-reloads for development use `npm run dev`
1. Update JSON files from `/data` and `/public/` directory
1. Upload all the images related to Speakers, Team and Sponsors in `/public/speakers/` | `/public/team/` with their respective directory and try to upload the images in 1:1 aspect ratio
1. For the production: `npm run generate` and then one dir will be created for static hosting

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Adding announcements
1. Add the announcement text in the [announcements.json](data/announcements.json) in the following format

**For text with actions**:
{
        "text": "Follow us on Instagram.",
        "action": {
            "link":"https://instagram.com/gdg_vizag/",
            "text":"Follow Now"}
},


**For text only**:
{
        "text": "Follow us on Instagram."
},

## Developed by
1. [Manas Malla](https://manasmalla.dev)
2. [Chandan Khamitkar](https://chandan-khamitkar-dev.vercel.app/)
3. [Vrijraj Singh](https://vrijraj.xyz/)
4. [Shivam Singh](https://shivam.live/)
5. [Sandali Singh](https://sandali.xyz/)

## Technology Stack

* [VueJS](https://vuejs.org/)
* [Nuxt](https://nuxt.com/)
* [Firebase](https://firebase.google.com/)

## Contributing
Awesome! We would greatly appreciate it if you could contribute to all kinds. To help smoothen the process we have a few non-exhaustive guidelines to follow which should get you going in no time.

## LICENSE
Check out the developer [LICENSE](https://github.com/oss-labs/devfest-2024/blob/main/LICENSE)

## Facing Any Problem or need any Help?
Write us in the [issues](https://github.com/oss-labs/devfest-2024/issues) section. Our team will try to solve your issue within 10-12 hours.<be>
