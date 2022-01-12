window.onload = function() {

    //buttons
    let dailyBtn = document.getElementById("daily-btn");
    let weeklyBtn = document.getElementById("weekly-btn");
    let monthlyBtn = document.getElementById("monthly-btn");

    //values
    let workHours = document.getElementById("work-hrs");
    let workPrevious = document.getElementById("work-previous");

    let playHours = document.getElementById("play-hrs");
    let playPrevious = document.getElementById("play-previous");

    let studyHours = document.getElementById("study-hrs");
    let studyPrevious = document.getElementById("study-previous");

    let exerciseHours = document.getElementById("exercise-hrs");
    let exercisePrevious = document.getElementById("exercise-previous");

    let socialHours = document.getElementById("social-hrs");
    let socialPrevious = document.getElementById("social-previous");

    let selfCareHours = document.getElementById("self-care-hrs");
    let selfCarePrevious = document.getElementById("self-care-previous");

    let hours= [workHours, playHours, studyHours, exerciseHours, socialHours, selfCareHours];
    let previous = [workPrevious, playPrevious, studyPrevious, exercisePrevious, socialPrevious, selfCarePrevious];


    dailyBtn.addEventListener("click", function() {
        toggleSelected(dailyBtn);

        fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            hours.forEach((hour, index) => {
                animateValue(hour, 0, data[index].timeframes.daily.current, 500, "hrs");
            });

            previous.forEach((prev, index) => {
                animateValue(prev, 0, data[index].timeframes.daily.previous, 500, "Yesterday");
            });
        });

    });

    weeklyBtn.addEventListener("click", function() {
        toggleSelected(weeklyBtn);

        fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            hours.forEach((hour, index) => {
                animateValue(hour, 0, data[index].timeframes.weekly.current, 500, "hrs");
            });

            previous.forEach((prev, index) => {
                animateValue(prev, 0, data[index].timeframes.weekly.previous, 500, "Last Week");
            });
        });
    });

    monthlyBtn.addEventListener("click", function() {
        toggleSelected(monthlyBtn); 

        fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            hours.forEach((hour, index) => {
                animateValue(hour, 0, data[index].timeframes.monthly.current, 500, "hrs");
            });

            previous.forEach((prev, index) => {
                animateValue(prev, 0, data[index].timeframes.monthly.previous, 500, "Last Month");
            });
        });
    });

    const toggleSelected = (btn) =>{
        switch(btn.id){
            case "daily-btn":
                dailyBtn.classList.add("selected");
                weeklyBtn.classList.remove("selected");
                monthlyBtn.classList.remove("selected");
                break;
            case "weekly-btn":
                dailyBtn.classList.remove("selected");
                weeklyBtn.classList.add("selected");
                monthlyBtn.classList.remove("selected");
                break;
            case "monthly-btn":
                dailyBtn.classList.remove("selected");
                weeklyBtn.classList.remove("selected");
                monthlyBtn.classList.add("selected");
                break;
        }
    }

    function animateValue(obj, start, end, duration, type) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          type==="hrs" ? obj.innerHTML = `${Math.floor(progress * (end - start) + start)} hrs` : obj.innerHTML = `${type} - ${Math.floor(progress * (end - start) + start)} hrs`; 
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
      
}