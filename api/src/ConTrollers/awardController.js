import * as Service from "../Services";

export const addAwardController = async (req, res) => {
    try {

        const { id_user, id_Dtnk, nameAward } = req.body
        const data = await Service.addAwardService({ id_user, id_Dtnk, nameAward })
        console.log(data);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateAwardController = async (req, res) => {
    try {
        const id = req.params.id;
        const { nameAward } = req.body; // Ensure this is a string

        const data = await Service.updateAwardService({ id, nameAward });
        console.log(data);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAllAwardController = async (req, res) => {
    try {
        const data = await Service.getAward(req.query);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteAwardController = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Service.deletAward({ id });
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
