<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-14 px-4 sm:py-12 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block text-indigo-800 pb-5">🚶‍♂️ Next Step 🚀</span>
            <span class="block">Standing by Derivkins in Transition</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Here to support every Derivkin affected by retrenchment — by making it easier for recruiters and hiring managers to find and connect with them.
          </p>
          <p class="mt-3 max-w-md mx-auto text-xs text-gray-400 sm:text-sm md:mt-5 md:text-base md:max-w-3xl">
            * this is not an official Derivco initiative, but a community effort to help each other during this transition period.
          </p>
          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <button
                @click="showListings = !showListings"
                class="w-full flex items-center justify-center px-8 pt-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                {{ showListings ? 'Hide List' : 'Show List' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Listings Section -->
    <div v-if="showListings" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Filters -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select v-model="filters.jobFamily" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="">All Job Families</option>
            <option v-for="family in jobFamilies" :key="family" :value="family">{{ family }}</option>
          </select>
          <select v-model="filters.jobProfile" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="">All Job Profiles</option>
            <option v-for="profile in jobProfiles" :key="profile" :value="profile">{{ profile }}</option>
          </select>
          <select v-model="filters.location" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="">All Locations</option>
            <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden mb-10">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Family</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Profile</th>              
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LinkedIn</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="person in filteredPeople" :key="person.name">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ person.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.jobFamily }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.jobProfile }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a :href="person.linkedin" target="_blank" class="text-indigo-600 hover:text-indigo-900">View Profile</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const showListings = ref(false)

// Sample data - In a real application, this would come from an API
const people = ref([
  {
    name: 'John Doe',
    jobProfile: 'Senior Software Engineer',
    jobFamily: 'Engineering',
    location: 'Cape Town',
    linkedin: 'https://linkedin.com/in/johndoe'
  },
  {
    name: 'Jane Smith',
    jobProfile: 'Product Manager',
    jobFamily: 'Product',
    location: 'Durban',
    linkedin: 'https://linkedin.com/in/janesmith'
  },
  {
    name: 'Mike Johnson',
    jobProfile: 'UX Designer',
    jobFamily: 'Design',
    location: 'Pretoria',
    linkedin: 'https://linkedin.com/in/mikejohnson'
  },
  {
    name: 'Michelle Jackson',
    jobProfile: 'UX Designer',
    jobFamily: 'Design',
    location: 'Isle of Man',
    linkedin: 'https://linkedin.com/in/mikejohnson'
  }
])

// Filters
const filters = ref({
  location: '',
  jobFamily: '',
  jobProfile: ''
})

// Computed properties for filter options
const locations = computed(() => [...new Set(people.value.map(p => p.location))])
const jobFamilies = computed(() => [...new Set(people.value.map(p => p.jobFamily))])
const jobProfiles = computed(() => [...new Set(people.value.map(p => p.jobProfile))])

// Filtered people based on selected filters
const filteredPeople = computed(() => {
  return people.value.filter(person => {
    return (!filters.value.location || person.location === filters.value.location) &&
           (!filters.value.jobFamily || person.jobFamily === filters.value.jobFamily) &&
           (!filters.value.jobProfile || person.jobProfile === filters.value.jobProfile)
  })
})
</script>
