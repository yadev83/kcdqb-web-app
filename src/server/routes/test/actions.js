export const greeting = (req, res) => {
    return res.status(200).json({message: 'Hello There !'})
}