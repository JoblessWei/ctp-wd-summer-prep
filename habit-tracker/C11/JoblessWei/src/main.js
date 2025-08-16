const habits = []

// show modal when create new habit button is clicked
document.getElementById("create_habit_btn").addEventListener("click", () =>{
    document.getElementById("habitModal").classList.remove("hidden")
});


// handle form submissions
document.getElementById('habitForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    console.log(e)
    const formData = new FormData(e.target);
    const habit = {
        name: formData.get('habitName'),
        category: formData.get('category'),
        frequency: formData.get('frequency'),
        reminder: formData.get('reminder') === 'on',
        streak: 0
    };

    try{
        habits.push(habit)
        localStorage.setItem("habits", JSON.stringify(habits))  // add habit to list

    } catch (error){
        console.log(error)
    }
    document.getElementById("habitModal").classList.add("hidden")
    renderHabit(habits)
    console.log('New habit created:', habit);

});

const renderHabit = (habits) => {
    const habitList = document.getElementById("habit_list")

    habitList.innerHTML = habits.map((habit, index) => {
        return  `<div class="habitCard">
        <div class="cardContent">
            <p>${habit.name}</p>
            <p>Category: ${habit.category}</p>
            <p>Streak:${habit.streak}</p>
            <p>Frquency: ${habit.frequency}</p>
        </div>
        <div class="cardButtons">
            <button class="deleteHabitButton" data-index=${index}> Delete Habit </button>
            <button class="completeButton" data-index=${index}> Mark as Complete </button>
        </div>
    </div>`
    }).join('\n')

}

// Increment streak by one when clicking on complete button
document.addEventListener('click', (e) =>{
    if (e.target.classList.contains('completeButton')){
        const index = e.target.getAttribute('data-index')

        console.log(index)
        
        habits[index].streak += 1;
        renderHabit(habits)
        console.log(habits[index].streak)
        localStorage.setItem("habits", JSON.stringify(habits))
    }

})
