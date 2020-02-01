import Dev from '../models/Dev';
import parseStringAsArray from "../utils/parseStringAsArray";

var searchController = {
    index: async (req, res) => {
        let devs = [];

        const { latitude, longitude, techs, github_username } = req.query;

        const techsArray = parseStringAsArray(techs, ',');

        if(latitude && longitude) {
            devs = await Dev.find({
                techs: {
                    $in: techsArray
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000
                    }
                }
            })
        } else {
            devs.push(await Dev.find({ github_username }))
        }

        res.json({ success: true, message: 'user retrieved successfully', devs });
    }
}

export default searchController;