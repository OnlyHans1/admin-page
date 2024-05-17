<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const dummyData = ref([
    {
        user: 'user1@example.com',
        action: 'Create',
        activity: 'Created new ticket',
        changedPage: 'Tickets',
        status: 'Success',
        date: '01-05-2024'
    },
    {
        user: 'user1@example.com',
        action: 'Update',
        activity: 'Updated user profile ',
        changedPage: 'Profile',
        status: 'Success',
        date: '02-05-2024'
    },
    {
        user: 'user3@example.com',
        action: 'Delete',
        activity: 'Deleted a comment',
        changedPage: 'Comments',
        status: 'Failed',
        date: '03-05-2024'
    },
    {
        user: 'user4@example.com',
        action: 'Create',
        activity: 'Created a blog post',
        changedPage: 'Blog',
        status: 'Success',
        date: '04-05-2024'
    },
    {
        user: 'user5@example.com',
        action: 'Update',
        activity: 'Updated blog post',
        changedPage: 'Blog',
        status: 'Success',
        date: '05-05-2024'
    },
    {
        user: 'user6@example.com',
        action: 'Delete',
        activity: 'Deleted an event',
        changedPage: 'Events',
        status: 'Success',
        date: '06-05-2024'
    },
    {
        user: 'user7@example.com',
        action: 'Create',
        activity: 'Created a new product',
        changedPage: 'Products',
        status: 'Failed',
        date: '07-05-2024'
    },
    {
        user: 'user8@example.com',
        action: 'Update',
        activity: 'Updated product details',
        changedPage: 'Products',
        status: 'Success',
        date: '08-05-2024'
    },
    {
        user: 'user9@example.com',
        action: 'Delete',
        activity: 'Deleted a user',
        changedPage: 'Users',
        status: 'Success',
        date: '09-05-2024'
    },
    {
        user: 'user10@example.com',
        action: 'Create',
        activity: 'Created new category',
        changedPage: 'Categories',
        status: 'Success',
        date: '10-05-2024'
    }
]);



const rowsPerPage = 2;
const currentPage = ref(1);

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dummyData.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(dummyData.value.length / rowsPerPage);
});

const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const visiblePages = computed(() => {
    const maxVisible = 3;
    let startPage = Math.max(currentPage.value - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages.value) {
        endPage = totalPages.value;
        startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return pages;
});
</script>


<template>
<div class="breadcrumb flex align-items-center gap[0.5] cursor-pointer" @click="router.push('/settings')">
    <ph-caret-left size="24" weight="bold"/> 
    <p>Kembali</p>
</div>
<h5 class="fw-600 sm-top-1">Database Logs</h5>

<div class="database-logs__content pd-right-1 sm-top-2">
    <div class="flex gap[0.5] align-items-center">
        <input type="search" name="" id="" placeholder="Search">
        <button class="database-logs__content_cta-search"><ph-magnifying-glass size="18" weight="bold"/></button>
    </div>
    <table>
        <thead>
            <th>User</th>
            <th>Action</th>
            <th>Activity</th>
            <th>Changed Page</th>
            <th>Status</th>
            <th>Date</th>
        </thead>
        <tbody>
            <tr v-for="logData in paginatedData" :key="logData.user">
                <td>{{ logData.user }}</td>
                <td>{{ logData.action }}</td>
                <td>{{ logData.activity }}</td>
                <td>{{ logData.changedPage }}</td>
                <td>
                    <div class="logdata-status" :class="{'status-success' : logData.status === 'Success', 'status-failed': logData.status === 'Failed'}">
                        {{ logData.status }}
                    </div>
                </td>
                <td>{{ logData.date }}</td>
            </tr>
            
        </tbody>
    </table>

    <div class="pagination-container ">
        <button class="pagination-button" @click="changePage(currentPage - 1)" :class="{ invisible: currentPage === 1 }">
            <ph-caret-left/>
        </button>
        <div class="pagination-numbers">
            <button 
                v-for="page in visiblePages" 
                :key="page" 
                @click="changePage(page)"
                :class="{'active': page === currentPage.value}">
                {{ page }}
            </button>
        </div>
        <button class="pagination-button" @click="changePage(currentPage + 1)" :class="{ invisible: currentPage === totalPages }">
            <ph-caret-right/>
        </button>
    </div>
</div>
</template>

<style scoped>


input[type=search]{
    width: 20rem;
    height: 2rem;
    border-radius: 0.5rem;
    border: 1px solid #000;
    padding: 0 1rem;
}
input[type=search]:focus{
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 1px var(--color-primary);
}

.database-logs__content_cta-search{
    background-color: var(--color-primary);
    display: flex;
    align-items: center; 
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
}

table{
    border-collapse: collapse;
    outline: 0;
    margin-top: 1rem;
    width: 100%;
    box-shadow: 1px 5px 10px 1px #0000012c;
    border-radius: 1rem;
    padding: 1rem;
}
thead {
    border-bottom: 1px solid #000;
}
th {
    height: 3rem;
    font-weight: 600;
}
th:nth-child(3){
    text-align: start;
    padding: 0 1rem
}
tr{
    max-height: 2rem;
}
td{
    max-height: 1.5rem;
    height: 1.5rem;
    text-align: center;
    max-width: 15rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 1rem;
    font-size: clamp(10px, 1vw, 14px);
}

td:nth-child(3){
    text-align: start;
}

td:nth-child(1){
    max-width: 10rem;
}
td:nth-child(5) {
    max-width: 4.5rem;
}
td:hover:not(:nth-child(5)) {
    padding: 0rem;
    position: relative; /* Make it relative for absolute child */
    overflow: visible; /* Show full content on hover */
    white-space: normal; /* Allow content to wrap on hover */
}
td:hover:nth-child(3){
    padding: 0 1rem;
}
.logdata-status span {
    font-weight: 600;
    text-align: center;
    display: flex;
    justify-content: center;
    align-self: center;
}

.status-success{
    color: #1d8335;
    background-color: #36d65b7a;
    border-radius: 1rem
    
}
.status-failed{
    color: #831d1d;
    background-color: #d636367a;
    border-radius: 1rem
}
.pagination-container {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
    gap: 1rem;
}

.pagination-numbers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}


.pagination-container button {   
     width: 2.5rem;
    height: 2.5rem;
    box-shadow: 1px 5px 10px 1px #0000012c;
    border-radius: 0.5rem;
}

.pagination-container button.active {
    background-color: var(--color-primary);
    color: white;
}

.pagination-button.invisible {
    visibility: hidden;
}


.pagination-container button:hover:not(:disabled) {
    background-color: var(--color-primary);
    color: white;
}
</style>