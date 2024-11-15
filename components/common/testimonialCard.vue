<template>
    <div fluid class="upcoming-events" style="height: 280px; width: 416px; display: inline-flex;">
        <div class="event-card">
            <div class="date-box">
                <p class="date">{{ testimonial.provider.role }}</p>
            </div>
            <p class="organizer"><v-icon class="mr-1">mdi-calendar</v-icon>{{ testimonial.event }}</p>
            <h3 class="mt-8">{{ testimonial.title }}</h3>
            <p class="description">{{ testimonial.description }}...
            </p>
            <div class="provider" style="display: flex; align-items: center; column-gap: 8px;">
                <img :src="testimonial.provider.image"
                    style="width: 28px; height: 28px; padding:2px; border-radius: 16px; margin-top: 8px; border: 1.5px solid #004740">
                <div>
                    <p class="location">{{ testimonial.provider.name }}</p>
                    <p style="font-size: 13px; opacity: 60%; color: #004740; max-width: 160px;" class="line-clamp-1">
                        {{
                            testimonial.provider.position }}, {{
                            testimonial.provider.company }}</p>
                </div>
            </div>
            <div><a target="_blank" href="" class="register-link links" alt="Register Here"
                    title="Register Here"><b>Read Here</b><span class="arrowup"></span></a></div>
        </div>
    </div>
</template>


<style scoped>
.upcoming-events .row {
    margin-left: 0;
    margin-right: 0
}

.upcoming-events h2 {
    margin-bottom: 0
}

.upcoming-events .event-card {
    background: url('/assets/img/curve-bg.svg') no-repeat;
    position: relative;
    padding: 16px 20px 25px 20px;
    width: 416px;
    background-size: contain;
    margin: 0 16px 0 0;
    display: inline-block;
    float: left;
    height: 280px;
}

.upcoming-events .event-card .date-box {
    position: absolute;
    top: 7px;
    left: 0;
    padding: 10px 15px
}

.upcoming-events .event-card .date-box .date {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    color: #004740
}

.upcoming-events .event-card .organizer {
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 28px;
    text-align: right;
    color: #004740;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
    justify-content: flex-end
}

.upcoming-events .event-card .organizer span {
    margin-right: 6px
}

.upcoming-events .event-card .description {
    margin-top: 10px;
    color: #004740;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    text-overflow: ellipsis
}

.upcoming-events .event-card h3 {
    font-size: 21px;
    color: #004740;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden
}

.upcoming-events .event-card .p {
    font-size: 1em;
    color: #004740;
    margin-bottom: 27px
}

.upcoming-events .provider {
    position: absolute;
    bottom: 16px;
    transform: translateX(-6px);
}

.upcoming-events .event-card .location {
    font-size: 1em;
    height: 1.25rem;
    color: #004740;
    display: flex;
    margin-top: 8px;
    font-weight: 600;
}

.upcoming-events .event-card .location span {
    margin-right: 6px
}

.upcoming-events .event-card .register-link {
    text-decoration: none;
    padding: 10px 10px;
    border-radius: 25px;
    position: absolute;
    bottom: 15px;
    right: 6px;
    font-weight: 500
}

.upcoming-events .event-card .viewdetails {
    margin-top: 17px
}

.upcoming-events .viewmore-section {
    width: 100%;
    display: inline-block
}

.upcoming-events .view-more {
    font-size: 1em;
    color: #004740;
    text-decoration: none;
    padding: 10px 0;
    border-radius: 5px;
    transition: background-color .2s, color .2s
}

.upcoming-events .tilebox-section {
    width: 100%;
    display: inline-block;
    margin-top: 40px
}

.upcoming-events .js-form-item {
    margin-bottom: 0
}

.upcoming-events.tabcommon ul {
    padding-bottom: 0
}

.allevents .tilebox-section1 {
    width: 100%;
    display: inline-block
}

.allevents .tilebox-section1 .event-card {
    margin: 0 16px 40px 0
}

.allevents .form-type-select select {
    width: 22%;
    color: #303630;
    border-bottom: solid 1px #004740
}

.allevents .form-submit {
    background: #a58255;
    border: 0;
    outline: 0;
    color: #fff;
    padding: 11px 23px;
    cursor: pointer;
    font-weight: 500;
    line-height: 1.2;
    border: solid 1px #a58255;
    margin-top: 20px
}


.links,
.white-links {
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    color: #007367;
    transition: .1s ease-in;
    font-weight: 600;
    font-size: var(--fs-14);
    width: -moz-fit-content;
    text-decoration: none;
    width: fit-content;
    margin-top: 1.5rem;
    font-weight: 500;
}

.links {
    color: #007367
}

.links:hover {
    color: #a58255
}

.links.space {
    width: 100%;
    gap: 0;
    justify-content: space-between
}

.white-links {
    color: #fcfcfc
}

.white-links:hover {
    color: #a58255
}

.links:hover span {
    transition: .4s ease;
    background: url("../images/arrow-icon-gold.svg") no-repeat
}

.white-links:hover span {
    background: url("../images/arrow-icon-gold.svg") no-repeat;
    transition: .4s ease
}

.line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
</style>

<script setup>
defineProps({
    testimonial: {
        type: Object,
        required: true
    }
})
</script>