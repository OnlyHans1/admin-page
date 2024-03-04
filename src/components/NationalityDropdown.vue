<script setup>
import { ref, onMounted, watchEffect } from 'vue'
const props = defineProps({
  nationalityWidth: { type: String, default: '17.75rem' }
})

const tempNationalityData = ref([
  { id: 1, nationality_name: 'Afghanistan' },
  { id: 2, nationality_name: 'Albania' },
  { id: 3, nationality_name: 'Algeria' },
  { id: 4, nationality_name: 'American Samoa' },
  { id: 5, nationality_name: 'Andorra' },
  { id: 6, nationality_name: 'Angola' },
  { id: 7, nationality_name: 'Anguilla' },
  { id: 8, nationality_name: 'Antarctica' },
  { id: 9, nationality_name: 'Antigua and Barbuda' },
  { id: 10, nationality_name: 'Argentina' },
  { id: 11, nationality_name: 'Armenia' },
  { id: 12, nationality_name: 'Aruba' },
  { id: 13, nationality_name: 'Australia' },
  { id: 14, nationality_name: 'Austria' },
  { id: 15, nationality_name: 'Azerbaijan' },
  { id: 16, nationality_name: 'Bahamas' },
  { id: 17, nationality_name: 'Bahrain' },
  { id: 18, nationality_name: 'Bangladesh' },
  { id: 19, nationality_name: 'Barbados' },
  { id: 20, nationality_name: 'Belarus' },
  { id: 21, nationality_name: 'Belgium' },
  { id: 22, nationality_name: 'Belize' },
  { id: 23, nationality_name: 'Benin' },
  { id: 24, nationality_name: 'Bermuda' },
  { id: 25, nationality_name: 'Bhutan' },
  { id: 26, nationality_name: 'Bolivia' },
  { id: 27, nationality_name: 'Bosnia and Herzegovina' },
  { id: 28, nationality_name: 'Botswana' },
  { id: 29, nationality_name: 'Bouvet Island' },
  { id: 30, nationality_name: 'Brazil' },
  { id: 31, nationality_name: 'British Indian Ocean Territory' },
  { id: 32, nationality_name: 'Brunei Darussalam' },
  { id: 33, nationality_name: 'Bulgaria' },
  { id: 34, nationality_name: 'Burkina Faso' },
  { id: 35, nationality_name: 'Burundi' },
  { id: 36, nationality_name: 'Cambodia' },
  { id: 37, nationality_name: 'Cameroon' },
  { id: 38, nationality_name: 'Canada' },
  { id: 39, nationality_name: 'Cape Verde' },
  { id: 40, nationality_name: 'Cayman Islands' },
  { id: 41, nationality_name: 'Central African Republic' },
  { id: 42, nationality_name: 'Chad' },
  { id: 43, nationality_name: 'Chile' },
  { id: 44, nationality_name: 'China' },
  { id: 45, nationality_name: 'Christmas Island' },
  { id: 46, nationality_name: 'Cocos (Keeling) Islands' },
  { id: 47, nationality_name: 'Colombia' },
  { id: 48, nationality_name: 'Comoros' },
  { id: 49, nationality_name: 'Congo' },
  { id: 50, nationality_name: 'Cook Islands' },
  { id: 51, nationality_name: 'Costa Rica' },
  { id: 52, nationality_name: 'Croatia (Hrvatska)' },
  { id: 53, nationality_name: 'Cuba' },
  { id: 54, nationality_name: 'Cyprus' },
  { id: 55, nationality_name: 'Czech Republic' },
  { id: 56, nationality_name: 'Denmark' },
  { id: 57, nationality_name: 'Djibouti' },
  { id: 58, nationality_name: 'Dominica' },
  { id: 59, nationality_name: 'Dominican Republic' },
  { id: 60, nationality_name: 'East Timor' },
  { id: 61, nationality_name: 'Ecuador' },
  { id: 62, nationality_name: 'Egypt' },
  { id: 63, nationality_name: 'El Salvador' },
  { id: 64, nationality_name: 'Equatorial Guinea' },
  { id: 65, nationality_name: 'Eritrea' },
  { id: 66, nationality_name: 'Estonia' },
  { id: 67, nationality_name: 'Ethiopia' },
  { id: 68, nationality_name: 'Falkland Islands (Malvinas)' },
  { id: 69, nationality_name: 'Faroe Islands' },
  { id: 70, nationality_name: 'Fiji' },
  { id: 71, nationality_name: 'Finland' },
  { id: 72, nationality_name: 'France' },
  { id: 73, nationality_name: 'France, Metropolitan' },
  { id: 74, nationality_name: 'French Guiana' },
  { id: 75, nationality_name: 'French Polynesia' },
  { id: 76, nationality_name: 'French Southern Territories' },
  { id: 77, nationality_name: 'Gabon' },
  { id: 78, nationality_name: 'Gambia' },
  { id: 79, nationality_name: 'Georgia' },
  { id: 80, nationality_name: 'Germany' },
  { id: 81, nationality_name: 'Ghana' },
  { id: 82, nationality_name: 'Gibraltar' },
  { id: 83, nationality_name: 'Guernsey' },
  { id: 84, nationality_name: 'Greece' },
  { id: 85, nationality_name: 'Greenland' },
  { id: 86, nationality_name: 'Grenada' },
  { id: 87, nationality_name: 'Guadeloupe' },
  { id: 88, nationality_name: 'Guam' },
  { id: 89, nationality_name: 'Guatemala' },
  { id: 90, nationality_name: 'Guinea' },
  { id: 91, nationality_name: 'Guinea-Bissau' },
  { id: 92, nationality_name: 'Guyana' },
  { id: 93, nationality_name: 'Haiti' },
  { id: 94, nationality_name: 'Heard and Mc Donald Islands' },
  { id: 95, nationality_name: 'Honduras' },
  { id: 96, nationality_name: 'Hong Kong' },
  { id: 97, nationality_name: 'Hungary' },
  { id: 98, nationality_name: 'Iceland' },
  { id: 99, nationality_name: 'India' },
  { id: 100, nationality_name: 'Isle of Man' },
  { id: 101, nationality_name: 'Indonesia' },
  { id: 102, nationality_name: 'Iran (Islamic Republic of)' },
  { id: 103, nationality_name: 'Iraq' },
  { id: 104, nationality_name: 'Ireland' },
  { id: 105, nationality_name: 'Israel' },
  { id: 106, nationality_name: 'Italy' },
  { id: 107, nationality_name: 'Ivory Coast' },
  { id: 108, nationality_name: 'Jersey' },
  { id: 109, nationality_name: 'Jamaica' },
  { id: 110, nationality_name: 'Japan' },
  { id: 111, nationality_name: 'Jordan' },
  { id: 112, nationality_name: 'Kazakhstan' },
  { id: 113, nationality_name: 'Kenya' },
  { id: 114, nationality_name: 'Kiribati' },
  { id: 115, nationality_name: "Korea, Democratic People's Republic of" },
  { id: 116, nationality_name: 'Korea, Republic of' },
  { id: 117, nationality_name: 'Kosovo' },
  { id: 118, nationality_name: 'Kuwait' },
  { id: 119, nationality_name: 'Kyrgyzstan' },
  { id: 120, nationality_name: "Lao People's Democratic Republic" },
  { id: 121, nationality_name: 'Latvia' },
  { id: 122, nationality_name: 'Lebanon' },
  { id: 123, nationality_name: 'Lesotho' },
  { id: 124, nationality_name: 'Liberia' },
  { id: 125, nationality_name: 'Libyan Arab Jamahiriya' },
  { id: 126, nationality_name: 'Liechtenstein' },
  { id: 127, nationality_name: 'Lithuania' },
  { id: 128, nationality_name: 'Luxembourg' },
  { id: 129, nationality_name: 'Macau' },
  { id: 130, nationality_name: 'Macedonia' },
  { id: 131, nationality_name: 'Madagascar' },
  { id: 132, nationality_name: 'Malawi' },
  { id: 133, nationality_name: 'Malaysia' },
  { id: 134, nationality_name: 'Maldives' },
  { id: 135, nationality_name: 'Mali' },
  { id: 136, nationality_name: 'Malta' },
  { id: 137, nationality_name: 'Marshall Islands' },
  { id: 138, nationality_name: 'Martinique' },
  { id: 139, nationality_name: 'Mauritania' },
  { id: 140, nationality_name: 'Mauritius' },
  { id: 141, nationality_name: 'Mayotte' },
  { id: 142, nationality_name: 'Mexico' },
  { id: 143, nationality_name: 'Micronesia, Federated States of' },
  { id: 144, nationality_name: 'Moldova, Republic of' },
  { id: 145, nationality_name: 'Monaco' },
  { id: 146, nationality_name: 'Mongolia' },
  { id: 147, nationality_name: 'Montenegro' },
  { id: 148, nationality_name: 'Montserrat' },
  { id: 149, nationality_name: 'Morocco' },
  { id: 150, nationality_name: 'Mozambique' },
  { id: 151, nationality_name: 'Myanmar' },
  { id: 152, nationality_name: 'Namibia' },
  { id: 153, nationality_name: 'Nauru' },
  { id: 154, nationality_name: 'Nepal' },
  { id: 155, nationality_name: 'Netherlands' },
  { id: 156, nationality_name: 'Netherlands Antilles' },
  { id: 157, nationality_name: 'New Caledonia' },
  { id: 158, nationality_name: 'New Zealand' },
  { id: 159, nationality_name: 'Nicaragua' },
  { id: 160, nationality_name: 'Niger' },
  { id: 161, nationality_name: 'Nigeria' },
  { id: 162, nationality_name: 'Niue' },
  { id: 163, nationality_name: 'Norfolk Island' },
  { id: 164, nationality_name: 'Northern Mariana Islands' },
  { id: 165, nationality_name: 'Norway' },
  { id: 166, nationality_name: 'Oman' },
  { id: 167, nationality_name: 'Pakistan' },
  { id: 168, nationality_name: 'Palau' },
  { id: 169, nationality_name: 'Palestine' },
  { id: 170, nationality_name: 'Panama' },
  { id: 171, nationality_name: 'Papua New Guinea' },
  { id: 172, nationality_name: 'Paraguay' },
  { id: 173, nationality_name: 'Peru' },
  { id: 174, nationality_name: 'Philippines' },
  { id: 175, nationality_name: 'Pitcairn' },
  { id: 176, nationality_name: 'Poland' },
  { id: 177, nationality_name: 'Portugal' },
  { id: 178, nationality_name: 'Puerto Rico' },
  { id: 179, nationality_name: 'Qatar' },
  { id: 180, nationality_name: 'Reunion' },
  { id: 181, nationality_name: 'Romania' },
  { id: 182, nationality_name: 'Russian Federation' },
  { id: 183, nationality_name: 'Rwanda' },
  { id: 184, nationality_name: 'Saint Kitts and Nevis' },
  { id: 185, nationality_name: 'Saint Lucia' },
  { id: 186, nationality_name: 'Saint Vincent and the Grenadines' },
  { id: 187, nationality_name: 'Samoa' },
  { id: 188, nationality_name: 'San Marino' },
  { id: 189, nationality_name: 'Sao Tome and Principe' },
  { id: 190, nationality_name: 'Saudi Arabia' },
  { id: 191, nationality_name: 'Senegal' },
  { id: 192, nationality_name: 'Serbia' },
  { id: 193, nationality_name: 'Seychelles' },
  { id: 194, nationality_name: 'Sierra Leone' },
  { id: 195, nationality_name: 'Singapore' },
  { id: 196, nationality_name: 'Slovakia' },
  { id: 197, nationality_name: 'Slovenia' },
  { id: 198, nationality_name: 'Solomon Islands' },
  { id: 199, nationality_name: 'Somalia' },
  { id: 200, nationality_name: 'South Africa' },
  { id: 201, nationality_name: 'South Georgia South Sandwich Islands' },
  { id: 202, nationality_name: 'South Sudan' },
  { id: 203, nationality_name: 'Spain' },
  { id: 204, nationality_name: 'Sri Lanka' },
  { id: 205, nationality_name: 'St. Helena' },
  { id: 206, nationality_name: 'St. Pierre and Miquelon' },
  { id: 207, nationality_name: 'Sudan' },
  { id: 208, nationality_name: 'Suriname' },
  { id: 209, nationality_name: 'Svalbard and Jan Mayen Islands' },
  { id: 210, nationality_name: 'Swaziland' },
  { id: 211, nationality_name: 'Sweden' },
  { id: 212, nationality_name: 'Switzerland' },
  { id: 213, nationality_name: 'Syrian Arab Republic' },
  { id: 214, nationality_name: 'Taiwan' },
  { id: 215, nationality_name: 'Tajikistan' },
  { id: 216, nationality_name: 'Tanzania, United Republic of' },
  { id: 217, nationality_name: 'Thailand' },
  { id: 218, nationality_name: 'Togo' },
  { id: 219, nationality_name: 'Tokelau' },
  { id: 220, nationality_name: 'Tonga' },
  { id: 221, nationality_name: 'Trinidad and Tobago' },
  { id: 222, nationality_name: 'Tunisia' },
  { id: 223, nationality_name: 'Turkey' },
  { id: 224, nationality_name: 'Turkmenistan' },
  { id: 225, nationality_name: 'Turks and Caicos Islands' },
  { id: 226, nationality_name: 'Tuvalu' },
  { id: 227, nationality_name: 'Uganda' },
  { id: 228, nationality_name: 'Ukraine' },
  { id: 229, nationality_name: 'United Arab Emirates' },
  { id: 230, nationality_name: 'United Kingdom' },
  { id: 231, nationality_name: 'United States' },
  { id: 232, nationality_name: 'United States minor outlying islands' },
  { id: 233, nationality_name: 'Uruguay' },
  { id: 234, nationality_name: 'Uzbekistan' },
  { id: 235, nationality_name: 'Vanuatu' },
  { id: 236, nationality_name: 'Vatican City State' },
  { id: 237, nationality_name: 'Venezuela' },
  { id: 238, nationality_name: 'Vietnam' },
  { id: 239, nationality_name: 'Virgin Islands (British)' },
  { id: 240, nationality_name: 'Virgin Islands (U.S.)' },
  { id: 241, nationality_name: 'Wallis and Futuna Islands' },
  { id: 242, nationality_name: 'Western Sahara' },
  { id: 243, nationality_name: 'Yemen' },
  { id: 244, nationality_name: 'Zaire' },
  { id: 245, nationality_name: 'Zambia' },
  { id: 246, nationality_name: 'Zimbabwe' }
])

const nationalityQuery = ref('')
const nationalityResult = ref([])
const isNationalityDropdownOpen = ref(false)

const loadNationalityData = () => {
  if (nationalityQuery.value.trim() !== '') {
    isNationalityDropdownOpen.value = true

    const filteredData = tempNationalityData.value.filter((nationality) => {
      return nationality.nationality_name
        .toLowerCase()
        .startsWith(nationalityQuery.value.trim().toLowerCase())
    })
    isNationalityDropdownOpen.value = nationalityResult.value.length > 0
  } else {
    nationalityResult.value = []
    isNationalityDropdownOpen.value = false
  }
}

const openNationalityDropdown = () => {
  if (nationalityQuery.value.trim() === '') {
    isNationalityDropdownOpen.value = true
    nationalityResult.value = tempNationalityData.value
  } else {
    isNationalityDropdownOpen.value = true
    loadNationalityData()
  }
}

const closeNationalityDropdown = () => {
  isNationalityDropdownOpen.value = false
  nationalityResult.value = []
}

const getNationality = (nationalityName) => {
  nationalityQuery.value = nationalityName
  nationalityResult.value = []
  isNationalityDropdownOpen.value = false
}

onMounted(() => {
  loadNationalityData()
  document.addEventListener('click', closeDropdownOutside)
})

const closeDropdownOutside = (event) => {
  const dropdownContainer = document.querySelector('.nationality-dropdown__container')
  if (dropdownContainer && !dropdownContainer.contains(event.target)) {
    closeNationalityDropdown()
  }
}

watchEffect((onInvalidate) => {
  onInvalidate(() => {
    document.removeEventListener('click', closeDropdownOutside)
  })
})
</script>

<template>
  <div class="nationality-dropdown__container" :style="{ width: nationalityWidth }">
    <input
      type="text"
      v-model="nationalityQuery"
      placeholder="Kebangsaan"
      @input="loadNationalityData"
      @focus="openNationalityDropdown"
      class="nationality-dropdown__input"
      :class="{ focus: isNationalityDropdownOpen }"
    />
    <div class="select-icon">
      <div class="arrow-icon" :class="{ active: isNationalityDropdownOpen }">
        <i class="ri-arrow-down-s-line"></i>
      </div>
    </div>
    <div
      :class="{ 'location__search-dropdown': true, active: isNationalityDropdownOpen }"
      class="w-full"
    >
      <div class="dropdown-nationality__result" :class="{ active: isNationalityDropdownOpen }">
        <div v-for="result in nationalityResult" :key="result.id">
          <p
            v-if="result.nationality_name"
            class="dropdown-nationality__name"
            @click="getNationality(result.nationality_name)"
          >
            {{ result.nationality_name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nationality-dropdown__container {
  height: 43px;
  border-radius: 3px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  position: relative;
  outline: none;
}
input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  padding: 0.75rem 0.75rem;
  border: 2px solid black;
}
input::placeholder {
  font-family: 'Inter';
  color: black;
  font-size: 16px;
  line-height: 19px;
}
input.focus {
  outline: none;
  border: 2px solid rgba(218, 165, 32, 1);
}
.nationality-dropdown__container .select-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.arrow-icon {
  transition: all 300ms ease;
}
.arrow-icon.active {
  transform: rotate(180deg);
}
.nationality-dropdown__container .select-icon i {
  font-size: 18px;
}
.dropdown-nationality__result {
  position: absolute;
  top: 2.6rem;
  background-color: white;
  width: 100%;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-radius: 10px;
  max-height: 0;
  overflow-y: scroll;
  transition: max-height 0.3s ease;
}
.dropdown-nationality__result::-webkit-scrollbar {
  width: 6px;
}
.dropdown-nationality__result::-webkit-scrollbar-track {
  background-color: lightgrey;
  border-radius: 2px;
}
.dropdown-nationality__result::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.dropdown-nationality__result.active {
  max-height: 360px;
}
.dropdown-nationality__result div {
  padding: 0.5rem 1.5rem;
}
.dropdown-nationality__result div:hover {
  background-color: rgb(233, 233, 233);
}
.dropdown-nationality__result div:hover:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}
.dropdown-nationality__result div:hover:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}
.dropdown-nationality__name {
  font-family: 'Open Sans';
  font-size: 14px;
  line-height: 19px;
}
</style>
