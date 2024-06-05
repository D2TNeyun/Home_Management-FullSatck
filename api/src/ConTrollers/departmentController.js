import * as Service from "../Services";

export const addDpmController = async (req, res) => {
    try {
        const { nameDepartment } = req.body
        const data = await Service.addDpm({ nameDepartment })
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

export const updateDpmController = async (req, res) => {
    try {
        const id = req.params.id;
        const { nameDepartment } = req.body; // Ensure this is a string

        const data = await Service.updateDpm({ id, nameDepartment });
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

export const deleteDpmController = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Service.deleteDpm({ id });
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAllDpmController = async (req, res) => {
    try {
        const data = await Service.getDpm(req.query);
        return res.json(data);
    } catch (e) {
        console.error(e);
        if (e) {
            return res.status(400).json({ error: e });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}