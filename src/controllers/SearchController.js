import Dev from '../models/Dev';
import parseStringAsArray from "../utils/parseStringAsArray";

var searchController = {
    index: async (req, res) => {

        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs, ',');

        const devs = await Dev.find({
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

        res.json({ success: true, message: 'user retrieved successfully', devs });
    }
}

export default searchController;