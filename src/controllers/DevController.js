import axios from "axios";
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';
import { findConnections, sendMessage } from '../websocket';

//index, show, store, update, destroy

var devController = {
    store: async (req, res) => {
        const { github_username, latitude, longitude, techs } = req.body;
        let dev = await Dev.findOne({ github_username });
        
        if(dev) {
            res.json({ success: false, message: 'Dev already exists in the database.' }).status(400);
            return false;
        }
        
        let techsArray = [];
        
        if (techs && techs.length > 0)
            techsArray = parseStringAsArray(techs, ',');
        
        const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
        //O sinal de igual indica se o nome não existir, usar o dado de "login" da response.data
        const { name = login, avatar_url, bio } = response.data;
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        //Não passar o sinal de ":" é chamado de short syntax no javascript, 
        //permitindo atribuir um valor com o mesmo nome na propriedade
        dev = await Dev.create({
            name, 
            github_username,
            avatar_url,
            biography: bio,
            techs: techsArray,
            location
        });

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
            );
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
    
        res.json({ success: true, message: "Dev successfully created!", devData: dev });
    },
    index: async (req, res) => {
        let devList = await Dev.find();
        res.json({ success: true, message: 'Devs list retrieved successfully!', devs: devList })
    },
    update: async (req, res) => {
        const { github_username } = req.body;
        
        let dev = await Dev.findOne({ github_username });
        
        if (!dev) {
            res.json({ success: false, message: 'No dev with the specified github username was found' }).status(404);
            return false;
        }

        const { name = dev.name, techs = dev.techs, avatar_url = dev.avatar_url, biography = dev.biography } = req.body;
        
        let techsArray = [];
        
        if (techs && techs.length > 0) {
            techsArray = parseStringAsArray(techs, ',');
        }

        dev = await Dev.updateOne({ github_username }, 
            {
                name,
                avatar_url,
                biography,
                techs: techsArray
            });

        res.json({ success: true, message: 'Dev updated successfully', dev });
    },
    destroy: async (req, res) => {
        const { github_username } = req.body;
        let dev = Dev.findOne({ github_username });

        if (!dev) {
            res.json({ success: false, message: 'Cannot delete a dev that is not in the database.' }).status(404);
            return false;
        }
        
        dev = await Dev.deleteOne({ github_username });

        res.json({ success: true, message: 'Dev deleted.', dev });
    }
}

export default devController;