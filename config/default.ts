//Perceba que com a utilização do typeScript a boa prática é ter uma pasta config , com um arquivo default.ts que vai me proporcionar passar o arquivo do dotEnv para lá para que eu possa, tipalos ao pegar em outro arquivo


import dotenv from "dotenv"

dotenv.config()

export default{ 
    //Para que eu possa utilizar o config.get e tipar , eu preciso que estes arquivos estão exportados e dentro de uma pasta config fora do src, assim eu posso pega-los e dessa forma tipar
    MONGODB_URI:process.env.MONGODB_URI,
    env: "development"
    

}