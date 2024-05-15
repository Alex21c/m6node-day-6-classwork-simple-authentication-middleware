import express from "express";

// make a express server
  let server = express();
  let port = 4000;
// i need to log following
  // + the HTTP method,
  // + the requested URL, and 
  // + the timestamp
  // + Additionally, log the time taken for processing the request.  
let products = {
  "Gold": "MMTC Pamp 999.9 pure fine Gold 10gm",
  "Silver": "MMTC Pamp 999.9 pure fine Silver 250gm",
};

function getFormattedDateString(timestamp){
  // Options for date formatting
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata' // Indian Standard Time
    };
  return timestamp.toLocaleString('en-IN', options);
}

let alex21cLoggerMiddleware = (req, res, next)=>{
  let reqBeginTimeStamp = new Date();
  let logTimeTaken = ()=>{
    let reqEndTimeStamp = new Date();
    let timeTakenForReqProcessing = reqEndTimeStamp - reqBeginTimeStamp;
    
    let log = {
      method: req.method,
      url: req.url,
      timeTaken: timeTakenForReqProcessing,
      timeStamp: getFormattedDateString(reqBeginTimeStamp)
    }
    // console.log(`METHOD:${req.method}, URL:${req.url}, TIME-TAKEN: ${timeTakenForReqProcessing}ms, TIMESTAMP:  ${reqBeginTimeStamp} `);
    console.log(log);
    return timeTakenForReqProcessing;
  }

  // when request is complete compute time taken, kind of clean up fxn
   res.on("finish", logTimeTaken);

  // return the control to the next middleware
   next();
}

function performingABCTask(delay){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve();
    }, delay);
  })
}

// attaching middleware
  server.use(alex21cLoggerMiddleware);

// accept request, GET /products
  server.get('/products', async (req, res)=>{
    await performingABCTask(101);
    res.json(products);
  });

// accept request, POST /addNewProduct
  server.post('/add-new-product', async (req, res)=>{
    await performingABCTask(50);
    res.send('product added !')
  })

// make it listen to port 
server.listen(port, ()=>{
  console.log(`Express server has been started at port: ${port}`);
})