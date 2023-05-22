//import express module
const express = require("express");
//import bcrypt module
const bcrypt = require("bcrypt");
// import body-parser module
const bodyParser = require("body-parser");
//import mongoose module
const mongoose = require("mongoose");
//import multer module
const multer = require("multer");
//import path module
//import axios module
const axios = require("axios")
const path = require("path");
//Connect APP with DB server
mongoose.connect("mongodb://127.0.0.1:27017/la7ninDB");
//create express application
const app = express();

// Configure Body-parser

// Send JSON responses

app.use(bodyParser.json());

// Get objects from Request

app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(

    "Access-Control-Allow-Headers",

    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"

  );

  res.setHeader(

    "Access-Control-Allow-Methods",

    "GET, POST, DELETE, OPTIONS, PATCH, PUT"

  );

  next();

});
//Upload  Files Config
app.use('/images', express.static(path.join('backend/images')));
//
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  "application/pdf": 'pdf'
}
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
      extension;
    cb(null, imgName);
  },
});

//Models Importation
const Match = require("./models/match");
//Models Importation
const Team = require("./models/team");
//Models Importation
const Player = require("./models/player");
//Models Importation
const User = require("./models/user");
//Models Importation
const Stadium = require("./models/stadium");
//Reclamations Importation
const Reclamation = require("./models/reclamation");
//Comments Importation
const Comment = require("./models/comment");
//Replyrec Importation
const Replyrec = require("./models/replyrec");





//Function generatedId
function generateId(T) {
  let max;
  if (T.length == 0) {
    max = 0;
  } else {
    max = T[0].id;
    for (let i = 0; i < T.length; i++) {
      if (T[i].id > max) {
        max = T[i].id;
      }
    }
  }
  return max + 1;
}
//Matches Tab Simulation
let matches = [
  { id: 1, scoreOne: 0, scoreTwo: 1, teamOne: "EST", teamTwo: "CSS" },
  { id: 2, scoreOne: 2, scoreTwo: 1, teamOne: "CIT", teamTwo: "WHU" },
  { id: 1, scoreOne: 3, scoreTwo: 4, teamOne: "LIV", teamTwo: "FULL" },
];
//Teams Tab simulation 
let teams = [
  { id: 1, name: "Football League", owner: "Jane", foundation: "1980" },
  { id: 2, name: "JVS", owner: "Paul", foundation: "1970" },
  { id: 3, name: "ESS", owner: "Meddeb", foundation: "1960" },
]
//Player Tab simulation 
let players = [
  { id: 1, image: "assets/images/img_1.jpg", name: "Cristiano", position: "Attaquant", number: 6, age: "42" },
  { id: 2, image: "assets/images/img_3.jpg", name: "Messi", position: "Attaquant", number: 10, age: "40" },
  { id: 3, image: "assets/images/img_2.jpg", name: "Mpapi", position: "Attaquant", number: 2, age: "23" },
]
//Player Tab simulation 
let users = [
  { id: 1, image: "assets/images/img_1.jpg", firstName: "Ali", lastName: "Ben Salah", email: "a@gmail.com", pwd: "123", role: "user" },
  { id: 2, image: "assets/images/img_3.jpg", firstName: "Amal", lastName: "Slahi", email: "amal@gmail.com", pwd: "123456", role: "user" },
  { id: 3, image: "assets/images/img_2.jpg", firstName: "Asma", lastName: "Akaichi", email: "asma@gmail.com", pwd: "123456", role: "admin" },
]
function checkEmail(email, usersTab) {
  let exist = false;
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].email == email) {
      exist = true;
      break;
    }
  }
  return exist;
}
//Busniss logic: sign
app.post("/users/signup", multer({ storage: storageConfig }).single('img'), (req, res) => {
  console.log("Here into BL: signup", req.body);
  bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
    console.log("crypted PWD", cryptedPwd);
    let url = req.protocol + "://" + req.get("host");
    let imgPath = req.file ?
      url + "/images/" + req.file.filename
      : url + "/images/avatar.jpg";
    //if (req.file){
    //imgPath=req.file.filename}
    //else{
    // imgPath=null;}
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      pwd: cryptedPwd,
      tel: req.body.tel,
      role: req.body.role,
      img: imgPath,

    });
    user.save((err, doc) => {
      console.log("Here error", err);
      console.log("Here doc", doc);
      if (err) {
        res.json({ message: false });
      } else {
        res.json({ message: true });
      }
    });

  });

});
//Business Logic : login
//0:Please check email
//1:Please check Pwd
//2:Welcome
app.post("/users/login", (req, res) => {
  console.log("Here into BL: Login", req.body)
  let user = req.body;
  let userToSend;
  User.findOne({ email: user.email }).then((response) => {
    if (!response) {
      res.json({ message: "0" });
    }
    userToSend = response;
    return bcrypt.compare(user.pwd, response.pwd);
  }).then((pwdResponse) => {
    console.log("Here pwdResponse", pwdResponse);
    if (!pwdResponse) {
      res.json({ message: "1" });
    } else {
      //object{fName, lName, id,role}
      let userObj = {
        id: userToSend._id,
        fNme: userToSend.firstName,
        lName: userToSend.lastName,
        role: userToSend.role,
      }
      res.json({ message: "2", user: userObj });
    }
  });
});
//Business Logic: Get All Matches
app.get("/matches", (req, res) => {
  console.log("Here into BL:get all matches");
  Match.find().then((docs) => {

    res.json({ matchesArray: docs, message: "Done" });
  })

});
//Business Logic: Get All Teams
app.get("/teams", (req, res) => {
  console.log("Here into BL: get all teams");
  Team.find().then((docs) => {
    res.json({ teamsArray: docs, message: "Done" });
  })


});
//Business Logic: Get All Players
app.get("/players", (req, res) => {
  console.log("Here into BL:get all players");
  Player.find().then((docs) => {
    res.json({ playersArray: docs });
  })

});
//Business Logic: Get All Stadiums
app.get("/stadiums", (req, res) => {
  console.log("Here into BL: get all stadiums");
  Stadium.find().then((docs) => {
    res.json({ stadiumsArray: docs });
  });

})
//Business Logic : Get MatchById
app.get("/matches/:id", (req, res) => {
  console.log("Here into BL:get match By Id");
  let id = req.params.id;
  Match.findOne({ _id: id }).then((doc) => {
    res.json({ match: doc });
  })
});
//Business Logic : Get TeamById
app.get("/teams/:id", (req, res) => {
  console.log("Here into BL:get team By Id");
  let id = req.params.id;
  Team.findOne({ _id: id }).then((doc) => {
    res.json({ team: doc });
  })

})
//Business Logic : Get PlayerById
app.get("/players/:id", (req, res) => {
  console.log("Here into BL:get player By Id");
  let id = req.params.id;
  Player.findOne({ _id: id }).then((doc) => {
    res.json({ player: doc });
  })

});
//Business Logic : Get UserById
app.get("/users/:id", (req, res) => {
  console.log("Here into  BL:get user By Id");
  let id = req.params.id;
  User.findOne({ _id: id }).then((doc) => {
    res.json({ user: doc });
  })
})
//Business Logic : Get PlayerById
app.get("/stadiums/:id", (req, res) => {
  console.log("Here into BL:get stadium By Id");
  let id = req.params.id;
  Stadium.findOne({ _id: id }).then((doc) => {
    res.json({ stadium: doc });
  })
})
//Business Logic: deleteMatch
app.delete("/matches/:id", (req, res) => {
  console.log("Here into BL: delete match By Id");
  let id = req.params.id;
  Match.deleteOne({ _id: id }).then((response) => {
    console.log("Here response", response);
    if (response.deletedCount == 1) {
      res.json({ isDeleted: true });
    }
    else {
      res.json({ isDeleted: false });
    }
  })

});
//Business Logic: deletePlayer
app.delete("/players/:id", (req, res) => {
  console.log("Here into BL: delete player");
  let id = req.params.id;
  Player.deleteOne({ _id: id }).then((response) => {
    console.log("Here response", response);
    if (response.deletedCount == 1) {
      res.json({ isDeleted: true });
    }
    else {
      res.json({ isDeleted: false });
    }

  })


});
//Business Logic: deleteTeam
app.delete("/teams/:id", (req, res) => {
  console.log("Here into BL: delete team")
  let id = req.params.id;
  Team.deleteOne({ _id: id }).then((response) => {
    if (response.deletedCount == 1) {
      res.json({ isDeleted: true });
    }
    else {
      res.json({ isDeleted: false });
    }
  })

})
//Business Logic: deleteStadium
app.delete("/stadiums/:id", (req, res) => {
  console.log("Here into BL: delete team");
  let id = req.params.id;
  Stadium.deleteOne({ _id: id }).then((response) => {
    if (response.deletedCount == 1) {
      res.json({ isDeleted: true });
    }
    else {
      res.json({ isDeleted: false });
    }
  })
})
//Business Logic: addMatch
app.post("/matches", (req, res) => {
  console.log("Here into BL: add match");
  //Get object from request
  let match = new Match(req.body);
  match.save();
  res.json({ message: "Added with success" });
});
//Business Logic: addTeam
app.post("/teams", (req, res) => {
  console.log("Here into BL: add team");
  let team = new Team(req.body);
  team.save();

  res.json({ message: "Added team with success" });
});
//Business Logic: addPlayer
app.post("/players", (req, res) => {
  console.log("Here into BL: add player")
  let player = new Player(req.body);
  player.save();

  res.json({ message: "Added player with success" });
});
//Business Logic: addStadium
app.post("/stadiums", (req, res) => {
  console.log("Here into BL: add stadium");
  let stadium = new Stadium(req.body);
  stadium.save();
  res.json({ message: "Added Stadium with success" });
});
//Business Logic: addReclamation
app.post("/reclamations", (req, res) => {
  console.log("Here into BL: add reclamation", req.body);
  let reclamation = new Reclamation(req.body);
  reclamation.save((err, doc) => {
    if (err) {

      res.json({ isAdded: false });
    } else {
      res.json({ isAdded: true });
    }
  });
});
//Business Logic: addReplayToreclamtion
app.post("/reclamations/reply", (req, res) => {
  console.log("Here into BL: add replyToreclamation", req.body);
  let replyrec = new Replyrec(req.body);
  replyrec.save((err, doc) => {
    if (err) {

      res.json({ isAdded: false });
    } else {
      res.json({ isAdded: true });
    }
  });
});
//Business Logic: addCommentToMatch
// import ObjectID
const { ObjectId } = require("mongodb");
const replyrec = require("./models/replyrec");
app.post("/matches/comment", (req, res) => {
  console.log("Here into addcommentttt", req.body);
  const comment = new Comment({
    content: req.body.content,
    userId: ObjectId(req.body.userId),
    matchId: ObjectId(req.body.matchId),
  });
  comment.save((err, result) => {
    console.log("Error", err);
    if (result) {
      res.status(200).json({
        message: "Comment added with success",
      });
    }
  });
});
//Business logic:getMatchComment
app.get("/matches/comments/getAll", (req, res) => {
  console.log("Here to get All matches with comments");
  Match.aggregate(
    [
      {
        $lookup: {
          from: "comments", // collection to join
          localField: "_id", //field from the input documents
          foreignField: "matchId", //field from the documents of the "from" collection

          as: "comments", // output array field
        },
      },
    ],

    (error, docs) => {
      res.status(200).json({
        matches: docs,
      });
    }
  );
})
//Business Logic: editMatch
app.put("/matches", (req, res) => {
  console.log("Here into BL: edit match");
  let newMatch = req.body;
  Match.updateOne({ _id: newMatch._id }, newMatch).then((response) => {
    console.log("Here response after update", response);
    if (response.nModified == 1) {
      res.json({ isUpdated: true });
    }
    else {
      res.json({ isUpdated: false });
    }
  });

});
//Business Logic: editTeam
app.put("/teams", (req, res) => {
  console.log("Here into BL: edit team");
  let newTeam = req.body;
  Team.updateOne({ _id: newTeam._id }, newTeam).then((response) => {
    console.log("Here response after update", response);
    if (response.nModified == 1) {
      res.json({ isUpdated: true });
    } else {
      res.json({ isUpdated: false });
    }
  })


});
//Business Logic: editPlayer
app.put("/players", (req, res) => {
  console.log("Here into BL: edit Player");
  let newPlayer = req.body;
  Player.updateOne({ _id: newPlayer._id }, newPlayer).then((response) => {
    console.log("Here response after update", response);
    if (response.nModified == 1) {
      res.json({ isUpdated: true });
    } else {
      res.json({ isUpdated: false });
    }
  })

});
//Business Logic: editStadium
app.put("/stadiums", (req, res) => {
  console.log("Here into BL: edit Stadium");
  let newStadium = req.body;
  Stadium.updateOne({ _id: newStadium._id }, newStadium).then((response) => {
    console.log("Here response after update", response);
    if (response.nModified == 1) {
      res.json({ isUpdated: true });
    } else {
      res.json({ isUpdated: false });
    }
  })
})
//Business Logic: search
app.post("/matches/search", (req, res) => {
  console.log("Here into BL: search score", req.body);
  let score = req.body;
  let findedScore = [];
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].scoreOne == score.scoreOne || matches[i].scoreTwo == score.scoreTwo) {
      findedScore.push(matches[i]);
    }
  }
  res.json({ searchArray: findedScore });
});

//Busniss Logic:Get All user  Reclamations
app.get("/reclamations/:id", (req, res) => {
  Reclamation.find({ userId: req.params.id }).then((docs) => {
    res.json({ reclamations: docs });
  });
});
//Busniss Logic:Get All user  Reply to Reclamations
app.get("/reclamations/getReply/:id1/:id2", (req, res) => {
  Replyrec.find({ userId: req.params.id1, reclamationId: req.params.id2 }).then((docs) => {
    res.json({ reply: docs });
  });
});
//Business Logic: search Weather
app.post("/weather", (req, res) => {
  console.log("Here into BL: country", req.body);
  const city = req.body.city;
  const apiKey = "62ee756a34835483299877a61961cafb";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey + "&units=metric"
  axios.get(apiUrl).then((response) => {
    console.log('Here response', response.data.weather);
    const weather = response.data.main;
    const wind = response.data.wind;
    const sys = response.data.sys;
    const name = response.data.name;
    console.log('Here weather main', weather);
    console.log('Here wind main', wind);
    console.log('Here sys main', sys);
    const result = {
      temp: weather.temp,
      pressure: weather.pressure,
      humidity: weather.humidity,
      wind: wind.speed,
      sys: sys.sunrise,
      name: name,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,

    }
    res.status(200).json({
      result: result
    })
  }
  );
})


//make app importable
module.exports = app;

