import "./style.css";
import image from "../src/assets/electric-keyboard.png";
import video from "../src/assets/5157-183300197.mp4";
import emptyheart from "../media/heartempty.png";
import heart from "../media/heart.png";
// import arr from "./main";
import { arr } from "./main";

let app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
<!-- NavBar -->
<div class="navbar bg-transparent absolute z-50">
  <div class="flex flex-row-reverse p-[0.6em]">
    <button
      class="btn btn-ghost text-white text-2xl hover:scale-105 hover:bg-transparent"
    >
      TypingClub
    </button>
     <img width="50" src=${image} alt="" />
  </div>
</div>
<!--  NavBar-->
<div class="relative z-[-1]">
<video
        autoplay
        loop
        muted
        plays-inline
      >
        <source src=${video} type="video/mp4" />
      </video>

</div>;
<button  id="btn"  >
Start Now
</button>
`;

let nextPage = document.querySelector<HTMLButtonElement>("#btn")!;
nextPage.addEventListener("click", () => {
  // Loading
  app.innerHTML = `
   <div id="secondpage" class="navbar">
      <div class="flex flex-row-reverse p-[0.6em]">
        <button
          class="btn btn-ghost text-white text-2xl hover:scale-105 hover:bg-transparent"
        >
          TypingClub
        </button>
        <img width="50" src="${image}" alt="" />
      </div>
    </div>

    <div
      id="secondpage"
      class="h-screen flex gap-12 flex-col justify-center items-center"
    >
      <div class="flex gap-2 items-center">
        <h1 class="text-red-500 text-4xl mb-3 ">Massage:</h1>
        <span class="text-white text-2xl animate-pulse"
          >You Must Harry
          <span class="text-red-500 animate-pulse"> UP! </span>
        </span>
      </div>
      <div class="animate-pulse flex flex-col items-center gap-4 w-96">
        <div>
          <div class="w-56 h-6 bg-white rounded-md"></div>
          <div class="w-28 h-4 bg-white mx-auto mt-3 rounded-md"></div>
        </div>
        <div class="h-7 bg-white w-full rounded-md"></div>
        <div class="h-7 bg-white w-full rounded-md"></div>
        <div class="h-7 bg-white w-full rounded-md"></div>
        <div class="h-7 bg-white w-1/2 rounded-md"></div>
      </div>
    </div>
  `;
  // Loading
  setTimeout(() => {
    localStorage.Ts
      ? (localStorage.Ts = localStorage.Ts)
      : (localStorage.Ts = 0);
    interface Setting {
      time: number;
      chance: number;
      score: number;
      words: string[];
      check: boolean;
      interval: number;
      runtimeout: () => number;
      changename: () => void;
      checkName: (Name: string) => void;
    }
    class Gamesetting implements Setting {
      public static highscore: number = 0;
      public static Name: string = "";
      public static firstNameSelected: string;
      constructor(
        public time: number,
        public chance: number,
        public score: number,
        public words: string[],
        public check: boolean,
        public interval: number
      ) {
        let firstidex = Math.floor(Math.random() * this.words.length);
        Gamesetting.firstNameSelected = this.words[firstidex];
      }
      runtimeout(): number {
        if (this.time > 0) {
          return this.time--;
        } else {
          this.chance--;
          return (this.time = 15);
        }
      }
      changename(): string {
        let wordlenght: number = this.words.length;
        let randomindex: number = Math.floor(Math.random() * wordlenght);
        Gamesetting.firstNameSelected = this.words[randomindex];
        Gamesetting.Name = this.words[randomindex];
        return this.words[randomindex];
      }
      checkName(Name: string): void {
        if (Name == Gamesetting.Name || Name == Gamesetting.firstNameSelected) {
          this.score += 5;
          this.check = true;
          if (localStorage.Ts <= this.score) {
            localStorage.Ts = this.score;
          }
        } else {
          this.check = false;
        }
      }
    }
    let gamesetting = new Gamesetting(15, 3, 0, arr, false, 16000);
    setInterval(() => {
      if (gamesetting.chance == 0) {
        app.innerHTML = ` <dialog id="my_modal_1" class="modal" open>
        <div class="modal-box">
          <h3 class="text-lg font-bold">Hello!</h3>
          <p class="py-4">Sorry you have lost... try again now!  </p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn" onclick="window.location.reload()" >PlayAgin</button>
            </form>
          </div>
        </div>
      </dialog>`;
      }
    }, 1000);

    app.innerHTML = `
          <div id="secondpage" class="h-screen">
              <!-- NavBar -->
              <div class="navbar bg-transparent">
                <div class="flex flex-row-reverse p-[0.6em]">
                  <button
                    class="btn btn-ghost text-white text-2xl hover:scale-105 hover:bg-transparent"
                  >
                    TypingClub
                  </button>
                  <img width="50" src="${image}" alt="" />
                </div>
              </div>
              <!--  NavBar-->
              <div class="flex justify-center h-[80vh] items-center">
                <div class="w-[70%] h-[75vh]">
                  <div>
                    <h1 class="text-center text-2xl text-white">
                      Type The Given Word In :
      
                      <span class="text-purple-400">${gamesetting.time}</span>
                      Second
                    </h1>
                    <p class="text-center text-xl mt-2 text-white">GoodLuck</p>
                    <div id="highscore" class="flex gap-4 mt-5 justify-center items-center"  >
              <h1 class=" text-3xl text-white ">TopScore:</h1>
            <Span class="text-4xl  text-black font-bold">${localStorage.Ts}</Span>
            </div>
                  </div>
                  <div class="flex justify-center gap-12 flex-wrap-reverse mt-10">
                    <div id="time" class="flex items-center gap-4">
                          <h1 class="text-2xl text-white">TimeLeft:</h1>
                        <span class="countdown font-mono text-white text-4xl">${gamesetting.time}</span>
                    </div>
                    <div id="chance" class="flex gap-4">
                          <img width="50" src=${heart} alt="" />
                      <img width="50" src=${heart} alt="" />
                      <img width="50" src=${heart} alt="" />
                    </div>
                    <div id="Score" class="flex gap-4">

                      <h1 class="text-4xl text-white">Score:</h1>
                      <span class="text-4xl text-white">${gamesetting.score}</span>
                    </div>
                  </div>
                  <div id="Randomname">
                  <h1 class="text-center text-5xl text-gray-800 my-[0.5em] ">BeReady</h1>
                  </div>
                  <div class="">
                    <input
                    id="Input"
                      type="text"
                      placeholder="Let's Type"
                      class="input input-bordered bg-white w-full text-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          `;
    //   time
    let time = document.querySelector<HTMLElement>("#time")!;
    setInterval(() => {
      time.innerHTML = `<h1 class="text-2xl text-white">TimeLeft:</h1>
        <span class="countdown font-mono  ${
          gamesetting.time <= 6 ? "text-red-500 animate-pulse" : "text-white"
        } text-4xl">${gamesetting.runtimeout()}</span>`;
    }, 1000);

    //time
    // Namechange
    let randomname = document.querySelector<HTMLElement>("#Randomname")!;
    setInterval(() => {
      randomname.innerHTML = `;
    <h1 class="text-center text-5xl text-white my-[0.5em]">${
      gamesetting.time <= 0
        ? gamesetting.changename()
        : Gamesetting.firstNameSelected
    }</h1>`;
    }, 1000);
    // Namechange
    // Chance
    let chance = document.querySelector<HTMLElement>("#chance")!;
    setInterval(() => {
      chance.innerHTML = `  ${
        gamesetting.chance == 3
          ? ` <img width="50" src=${heart} alt="" />
       <img width="50" src=${heart} alt="" />
       <img width="50" src=${heart} alt="" />`
          : gamesetting.chance == 2
          ? ` <img width="50" src=${emptyheart} alt="" />
       <img width="50" src=${heart} alt="" />
       <img width="50" src=${heart} alt="" />`
          : gamesetting.chance == 1 &&
            ` <img width="50" src=${emptyheart} alt="" />
       <img width="50" src=${emptyheart} alt="" />
       <img width="50" src=${heart} alt="" />`
      }`;
    }, 1000);
    // Chance
    let Input = document.querySelector<HTMLElement>("#Input")!;
    let Score = document.querySelector<HTMLElement>("#Score")!;
    let highscore = document.querySelector<HTMLElement>("#highscore")!;

    Input.addEventListener("keyup", (e) => {
      gamesetting.checkName((<HTMLTextAreaElement>e.target).value);
      // Score Incraese
      if (gamesetting.check) {
        (<HTMLTextAreaElement>e.target).value = "";
        Score.innerHTML = ` <h1 class="text-4xl text-white">Score:</h1>
      <span class="text-4xl text-white">${gamesetting.score}</span>`;
        gamesetting.time = 15;
        randomname.innerHTML = `;
    <h1 class="text-center text-5xl text-white my-[0.5em]">${gamesetting.changename()}</h1>`;
        highscore.innerHTML = `
      <h1 class=" text-3xl text-white ">TopScore:</h1>
            <Span class="text-4xl  text-black font-bold">${localStorage.Ts}</Span>
      `;
      }

      // Score Incraese
    });
  }, 2500);
});
