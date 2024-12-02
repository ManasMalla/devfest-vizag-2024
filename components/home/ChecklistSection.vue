<template>
    <div id="tasks" class="tasks mt-2">
        <!-- Tasks will be dynamically generated here -->

        <a class="task" :class="task.isCompleted ? 'done' : ''" v-for="task in $props.tasks" :key="task.id"
            :href="task.route">
            <span>{{ task.name }}</span>
            <span class="arrow" v-if="!task.isCompleted">{{ '›' }}</span>
        </a>
    </div>
</template>

<script setup>
defineProps({
    tasks: {
        type: Array,
        required: true,
    },
});
</script>

<style scoped>
a {
    text-decoration: none;
}

.task-interface {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
}

h2 {
    font-size: 0.9rem;
    color: #757575;
    margin: 1.5rem 0;
    text-transform: uppercase;
    font-weight: bold;
}

/* Task List Styling */
.tasks {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0;
    padding: 0;
}

/* Vertical Dotted Line */
.tasks::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 14px;
    width: 2px;
    border-left: 2px dotted #d1d1d1;
    z-index: 0;
}

/* Individual Task Items */
.task {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 30px;
    margin: 10px 0;
    z-index: 1;
    cursor: pointer;
}

.task:hover span {
    color: #4285F4;
    /* Google blue */
}

.task span {
    margin-left: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #424242;
}

.task::before {
    content: "";
    position: absolute;
    left: 9px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border: 2px solid #757575;
    /* Creates an outlined circle */
    border-radius: 50%;
    background: #fff;
    /* Make it hollow inside */
}

.task.done span {
    text-decoration: line-through;
    /* opacity: 50%; */
    font-weight: normal;
}

.task.done {
    pointer-events: none;
}

.task.done:hover span {
    color: #424242;
}

.task.done::before {
    font-family: 'Material Symbols Rounded';
    width: 24px;
    height: 24px;
    content: "\E5CA";
    text-decoration: none;
    /* Checkmark when done */
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: centers;
    color: #4caf50;
    /* Green color for the tick */
    background: #FFF;
    transform: translateY(-50%) translateX(-12%);
    /* Remove background */
    border: none;
    /* Remove the border */
}

.arrow {
    margin-left: auto;
    font-size: 1rem;
    color: #9e9e9e;
}

.arrow:hover {
    color: #333;
}
</style>