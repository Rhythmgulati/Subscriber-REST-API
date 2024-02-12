const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscribers");

router.get("/",async(req,res)=>{
    try {
        const data = await Subscriber.find();
        res.send(data) 
    } catch (error) {
        res.status(500).send("no data found")
    } 
});
router.get("/:id",getSubscriber,(req,res)=>{
       res.send(res.subscriber)
});
router.post("/",async (req,res)=>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.subscriberToChannel
    })  
    try {
       const newsub =  await subscriber.save();
       res.send(newsub);
      } catch (error) {
        res.status(500).send("error unable to add data");
      }
});

router.patch("/:id",getSubscriber,async (req,res)=>{
   if(req.body.name != null){
    res.subscriber.name = req.body.name
   }
   if(req.body.subscriberToChannel != null){
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel
   }
   try {
     const updatedSubscriber = await res.subscriber.save();
     res.json(updatedSubscriber);
   } catch (error) {
    res.status(400).json({message:error.message})
   }
});
router.delete("/:id",getSubscriber, async (req,res)=>{
   try {
    await res.subscriber.deleteOne() 
    res.json({message:"deleted"})
   } catch (error) {
    res.status(401).json({message: error.message})
   }
});
async function getSubscriber(req,res,next){
   let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message:"cannot find subscriber"});
        }
    } catch (error) {
        return res.status(500).send(error);
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;