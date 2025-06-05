import mongoose from "mongoose";
import dotenv from "dotenv";
import Recommendation from "./models/Recommendation.js";

dotenv.config();

const topHorrorPicks = [
  { title: "Clown in a Cornfield", duration: "1 hr 36 min", genre: "Slasher", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/diPSE2jVqMQF1g6u1duFzzxMxh9.jpg" },
  { title: "Hurry Up Tomorrow", duration: "1 hr 45 min", genre: "Psychological Thriller", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9W44XSMYbjXdlXcQhD104zPhhhJ.jpg" },
  { title: "Final Destination Bloodlines", duration: "1 hr 50 min", genre: "Supernatural Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg" },
  { title: "Fear Street: Prom Queen", duration: "1 hr 28 min", genre: "Horror Slasher", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gevScWYkF8l5i9NjFSXo8HfPNyy.jpg" },
  { title: "Bring Her Back", duration: "1 hr 39 min", genre: "Supernatural Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1zcH6vJs0TnCVXK7TGdTkEzR5J8.jpg" },
  { title: "The Surfer", duration: "1 hr 43 min", genre: "Psychological Thriller", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jOkBvUBLAbDIIzPTre3KEzIt0oB.jpg" },
  { title: "Rosario", duration: "1 hr 28 min", genre: "Supernatural Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/h91QHXPCb96x2J5mahqyW8QZay2.jpg" },
  { title: "A Desert", duration: "1 hr 43 min", genre: "Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/vd194U3uHmxs5rZBV2QU7HNDdEf.jpg" },
  { title: "The Moogai", duration: "2 hr 49 min", genre: "Horror Mystery Thriller", image: "https://m.media-amazon.com/images/M/MV5BMTM1ZGFjYjUtNjU1Ni00MDIzLWFjYzYtZGNlOGI2YTk1ODZmXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg" },
  { title: "The Surrender", duration: "1 hr 30 min", genre: "Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/t45V9B1kSvwVpupWie1t9e1YWXe.jpg" },
].map(item => ({ ...item, category: "Top Horror Picks" }));

const cultClassics = [
  { title: "Jennifer's Body (2009)", duration: "1 hr 47 min", genre: "Horror Comedy", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/wrkjsGcFJxcQqR56kJUYAEKKg2T.jpg" },
  { title: "Re-Animator (1985)", duration: "1 hr 26 min", genre: "Science Fiction Comedy Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1hY6AUl92cL9GdZx031UWFiGETt.jpg" },
  { title: "Suspiria (1977)", duration: "1 hr 39 min", genre: "Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5ya8jTbNZTrCFUx9OwpNBjCivXY.jpg" },
  { title: "The Cabin in the Woods (2011)", duration: "1 hr 35 min", genre: "Horror Mystery", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/zZZe5wn0udlhMtdlDjN4NB72R6e.jpg" },
  { title: "Night of the Living Dead (1968)", duration: "1 hr 36 min", genre: "Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/inNUOa9WZGdyRXQlt7eqmHtCttl.jpg" },
  { title: "The Texas Chain Saw Massacre (1974)", duration: "1 hr 23 min", genre: "Anthology Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mpgkRPH1GNkMCgdPk2OMyHzAks7.jpg" },
  { title: "The Thing (1982)", duration: "1 hr 49 min", genre: "Horror Mystery Science Fiction", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/a9RjXOIIB56k2rGoL3Fk3nRHHHQ.jpg" },
  { title: "The Evil Dead (1981)", duration: "1 hr 25 min", genre: "Horror", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/uYxQ6xhP3WjqPZtxyAOnZQWnZqn.jpg" },
  { title: "Trick 'r Treat (2007)", duration: "1 hr 22 min", genre: "Horror Comedy", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/w0nmol4g7n6MFfhfphV7GzHHYjB.jpg" },
  { title: "The Rocky Horror Picture Show (1975)", duration: "1 hr 40 min", genre: "Comedy Horror Science Fantasy Fiction", image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3pyE6ZqDbuJi7zrNzzQzcKTWdmN.jpg" },
].map(item => ({ ...item, category: "Cult Classics" }));

const horrorGames = [
  { title: "Imscared (2012)", duration: "Approximately 1-2 hrs", genre: "Windows Android", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/001_b36cd9.jpg?w=1280" },
  { title: "Five Nights at Freddy’s 4 (2015)", duration: " Approximately 3-4 hrs", genre: "Windows Mac Mobile Console", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/002_5e6d2a.jpg?w=1280" },
  { title: "P.T. (2014)", duration: "Approximately 30 mins", genre: "PlayStation 4", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/004-1.jpg?w=1280" },
  { title: "Phasmophobia (2020)", duration: "Approximately 15-30 mins", genre: "Windows Console", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/010-1.jpg?w=1280" },
  { title: "Clock Tower (1995)", duration: "Approximately 15 hrs", genre: "Super Famicon PlayStation", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/005_0e3750.jpg?w=1280" },
  { title: "Rule of Rose (2006)", duration: "Approximately 10-12 hrs", genre: "PlayStation 2", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/008_9558fe.jpg?w=1280" },
  { title: "Resident Evil 7: Biohazard (2017)", duration: "Approximately 8-10 hrs", genre: "Console Mac", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/003_54d422.jpg?w=1280" },
  { title: "Outlast (2013)", duration: "Approximately 5-6 hrs", genre: "Windows Console", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/006_3b24d9.jpg?w=1280" },
  { title: "Fatal Frame III: The Tormented (2005)", duration: "Approximately 12-15 hrs", genre: "Playstation 2", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/007-1.jpg?w=1280" },
  { title: "Amnesia: The Dark Descent (2010)", duration: "Approximately 8-10 hrs", genre: "Windows Mac Console", image: "https://www.rollingstone.com/wp-content/uploads/2024/10/009_6e429e.jpg?w=1280" },
].map(item => ({ ...item, category: "Horror Games" }));

const seedData = [...topHorrorPicks, ...cultClassics, ...horrorGames];

mongoose
  .connect(process.env.HORROR_HUBDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await Recommendation.deleteMany({});
    console.log("🧹 Cleared old data");

    await Recommendation.insertMany(seedData);
    console.log("🌱 Seeding complete");

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Seeding error:", err);
  });
