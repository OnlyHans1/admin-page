<script setup>
import { ref, onMounted, watchEffect } from 'vue'
const props = defineProps({
  nationalityWidth: { type: String, default: '17.75rem' }
})
const tempNationalityData = ref([
  { id: 1, nationality_name: 'Afghanistan', country_code: 'af' },
  { id: 2, nationality_name: 'Albania', country_code: 'al' },
  { id: 3, nationality_name: 'Algeria', country_code: 'dz' },
  { id: 4, nationality_name: 'American Samoa', country_code: 'as' },
  { id: 5, nationality_name: 'Andorra', country_code: 'ad' },
  { id: 6, nationality_name: 'Angola', country_code: 'ao' },
  { id: 7, nationality_name: 'Anguilla', country_code: 'ai' },
  { id: 8, nationality_name: 'Antarctica', country_code: 'aq' },
  { id: 9, nationality_name: 'Antigua and Barbuda', country_code: 'ag' },
  { id: 10, nationality_name: 'Argentina', country_code: 'ar' },
  { id: 11, nationality_name: 'Armenia', country_code: 'am' },
  { id: 12, nationality_name: 'Aruba', country_code: 'aw' },
  { id: 13, nationality_name: 'Australia', country_code: 'au' },
  { id: 14, nationality_name: 'Austria', country_code: 'at' },
  { id: 15, nationality_name: 'Azerbaijan', country_code: 'az' },
  { id: 16, nationality_name: 'Bahamas', country_code: 'bs' },
  { id: 17, nationality_name: 'Bahrain', country_code: 'bh' },
  { id: 18, nationality_name: 'Bangladesh', country_code: 'bd' },
  { id: 19, nationality_name: 'Barbados', country_code: 'bb' },
  { id: 20, nationality_name: 'Belarus', country_code: 'by' },
  { id: 21, nationality_name: 'Belgium', country_code: 'be' },
  { id: 22, nationality_name: 'Belize', country_code: 'bz' },
  { id: 23, nationality_name: 'Benin', country_code: 'bj' },
  { id: 24, nationality_name: 'Bermuda', country_code: 'bm' },
  { id: 25, nationality_name: 'Bhutan', country_code: 'bt' },
  { id: 26, nationality_name: 'Bolivia', country_code: 'bo' },
  { id: 27, nationality_name: 'Bosnia and Herzegovina', country_code: 'ba' },
  { id: 28, nationality_name: 'Botswana', country_code: 'bw' },
  { id: 29, nationality_name: 'Bouvet Island', country_code: 'bv' },
  { id: 30, nationality_name: 'Brazil', country_code: 'br' },
  { id: 32, nationality_name: 'Brunei Darussalam', country_code: 'bn' },
  { id: 33, nationality_name: 'Bulgaria', country_code: 'bg' },
  { id: 34, nationality_name: 'Burkina Faso', country_code: 'bf' },
  { id: 35, nationality_name: 'Burundi', country_code: 'bi' },
  { id: 36, nationality_name: 'Cambodia', country_code: 'kh' },
  { id: 37, nationality_name: 'Cameroon', country_code: 'cm' },
  { id: 38, nationality_name: 'Canada', country_code: 'ca' },
  { id: 39, nationality_name: 'Cape Verde', country_code: 'cv' },
  { id: 40, nationality_name: 'Cayman Islands', country_code: 'ky' },
  { id: 41, nationality_name: 'Central African Republic', country_code: 'cf' },
  { id: 42, nationality_name: 'Chad', country_code: 'td' },
  { id: 43, nationality_name: 'Chile', country_code: 'cl' },
  { id: 44, nationality_name: 'China', country_code: 'cn' },
  { id: 45, nationality_name: 'Christmas Island', country_code: 'cx' },
  { id: 47, nationality_name: 'Colombia', country_code: 'co' },
  { id: 48, nationality_name: 'Comoros', country_code: 'km' },
  { id: 49, nationality_name: 'Congo', country_code: 'cg' },
  { id: 50, nationality_name: 'Cook Islands', country_code: 'ck' },
  { id: 51, nationality_name: 'Costa Rica', country_code: 'cr' },
  { id: 52, nationality_name: 'Croatia', country_code: 'hr' },
  { id: 53, nationality_name: 'Cuba', country_code: 'cu' },
  { id: 54, nationality_name: 'Cyprus', country_code: 'cy' },
  { id: 55, nationality_name: 'Czech Republic', country_code: 'cz' },
  { id: 56, nationality_name: 'Denmark', country_code: 'dk' },
  { id: 57, nationality_name: 'Djibouti', country_code: 'dj' },
  { id: 58, nationality_name: 'Dominica', country_code: 'dm' },
  { id: 59, nationality_name: 'Dominican Republic', country_code: 'do' },
  { id: 60, nationality_name: 'East Timor', country_code: 'tl' },
  { id: 61, nationality_name: 'Ecuador', country_code: 'ec' },
  { id: 62, nationality_name: 'Egypt', country_code: 'eg' },
  { id: 63, nationality_name: 'El Salvador', country_code: 'sv' },
  { id: 64, nationality_name: 'Equatorial Guinea', country_code: 'gq' },
  { id: 65, nationality_name: 'Eritrea', country_code: 'er' },
  { id: 66, nationality_name: 'Estonia', country_code: 'ee' },
  { id: 67, nationality_name: 'Ethiopia', country_code: 'et' },
  { id: 68, nationality_name: 'Falkland Islands (Malvinas)', country_code: 'fk' },
  { id: 69, nationality_name: 'Faroe Islands', country_code: 'fo' },
  { id: 70, nationality_name: 'Fiji', country_code: 'fj' },
  { id: 71, nationality_name: 'Finland', country_code: 'fi' },
  { id: 72, nationality_name: 'France', country_code: 'fr' },
  { id: 73, nationality_name: 'French Guiana', country_code: 'gf' },
  { id: 74, nationality_name: 'French Polynesia', country_code: 'pf' },
  { id: 75, nationality_name: 'French Southern Territories', country_code: 'tf' },
  { id: 76, nationality_name: 'Gabon', country_code: 'ga' },
  { id: 77, nationality_name: 'Gambia', country_code: 'gm' },
  { id: 78, nationality_name: 'Georgia', country_code: 'ge' },
  { id: 79, nationality_name: 'Germany', country_code: 'de' },
  { id: 80, nationality_name: 'Ghana', country_code: 'gh' },
  { id: 81, nationality_name: 'Gibraltar', country_code: 'gi' },
  { id: 82, nationality_name: 'Greece', country_code: 'gr' },
  { id: 83, nationality_name: 'Greenland', country_code: 'gl' },
  { id: 84, nationality_name: 'Grenada', country_code: 'gd' },
  { id: 85, nationality_name: 'Guadeloupe', country_code: 'gp' },
  { id: 86, nationality_name: 'Guam', country_code: 'gu' },
  { id: 87, nationality_name: 'Guatemala', country_code: 'gt' },
  { id: 88, nationality_name: 'Guinea', country_code: 'gn' },
  { id: 89, nationality_name: 'Guinea-Bissau', country_code: 'gw' },
  { id: 90, nationality_name: 'Guyana', country_code: 'gy' },
  { id: 91, nationality_name: 'Haiti', country_code: 'ht' },
  { id: 92, nationality_name: 'Heard Island', country_code: 'hm' },
  { id: 93, nationality_name: 'Honduras', country_code: 'hn' },
  { id: 94, nationality_name: 'Hong Kong', country_code: 'hk' },
  { id: 95, nationality_name: 'Hungary', country_code: 'hu' },
  { id: 96, nationality_name: 'Iceland', country_code: 'is' },
  { id: 97, nationality_name: 'India', country_code: 'in' },
  { id: 98, nationality_name: 'Indonesia', country_code: 'id' },
  { id: 99, nationality_name: 'Iran', country_code: 'ir' },
  { id: 100, nationality_name: 'Iraq', country_code: 'iq' },
  { id: 101, nationality_name: 'Ireland', country_code: 'ie' },
  { id: 102, nationality_name: 'Israel', country_code: 'il' },
  { id: 103, nationality_name: 'Italy', country_code: 'it' },
  { id: 104, nationality_name: 'Jamaica', country_code: 'jm' },
  { id: 105, nationality_name: 'Japan', country_code: 'jp' },
  { id: 106, nationality_name: 'Jordan', country_code: 'jo' },
  { id: 107, nationality_name: 'Kazakhstan', country_code: 'kz' },
  { id: 108, nationality_name: 'Kenya', country_code: 'ke' },
  { id: 109, nationality_name: 'Kiribati', country_code: 'ki' },
  { id: 110, nationality_name: 'North Korea', country_code: 'kp' },
  { id: 111, nationality_name: 'South Korea', country_code: 'kr' },
  { id: 112, nationality_name: 'Kuwait', country_code: 'kw' },
  { id: 113, nationality_name: 'Kyrgyzstan', country_code: 'kg' },
  { id: 114, nationality_name: 'Laos ', country_code: 'la' },
  { id: 115, nationality_name: 'Latvia', country_code: 'lv' },
  { id: 116, nationality_name: 'Lebanon', country_code: 'lb' },
  { id: 117, nationality_name: 'Lesotho', country_code: 'ls' },
  { id: 118, nationality_name: 'Liberia', country_code: 'lr' },
  { id: 119, nationality_name: 'Libya', country_code: 'ly' },
  { id: 120, nationality_name: 'Liechtenstein', country_code: 'li' },
  { id: 121, nationality_name: 'Lithuania', country_code: 'lt' },
  { id: 122, nationality_name: 'Luxembourg', country_code: 'lu' },
  { id: 123, nationality_name: 'Macau', country_code: 'mo' },
  { id: 124, nationality_name: 'Macedonia', country_code: 'mk' },
  { id: 125, nationality_name: 'Madagascar', country_code: 'mg' },
  { id: 126, nationality_name: 'Malawi', country_code: 'mw' },
  { id: 127, nationality_name: 'Malaysia', country_code: 'my' },
  { id: 128, nationality_name: 'Maldives', country_code: 'mv' },
  { id: 129, nationality_name: 'Mali', country_code: 'ml' },
  { id: 130, nationality_name: 'Malta', country_code: 'mt' },
  { id: 131, nationality_name: 'Marshall Islands', country_code: 'mh' },
  { id: 132, nationality_name: 'Martinique', country_code: 'mq' },
  { id: 133, nationality_name: 'Mauritania', country_code: 'mr' },
  { id: 134, nationality_name: 'Mauritius', country_code: 'mu' },
  { id: 135, nationality_name: 'Mayotte', country_code: 'yt' },
  { id: 136, nationality_name: 'Mexico', country_code: 'mx' },
  { id: 137, nationality_name: 'Micronesia', country_code: 'fm' },
  { id: 138, nationality_name: 'Moldova', country_code: 'md' },
  { id: 139, nationality_name: 'Monaco', country_code: 'mc' },
  { id: 140, nationality_name: 'Mongolia', country_code: 'mn' },
  { id: 141, nationality_name: 'Montserrat', country_code: 'ms' },
  { id: 142, nationality_name: 'Morocco', country_code: 'ma' },
  { id: 143, nationality_name: 'Mozambique', country_code: 'mz' },
  { id: 144, nationality_name: 'Myanmar', country_code: 'mm' },
  { id: 145, nationality_name: 'Namibia', country_code: 'na' },
  { id: 146, nationality_name: 'Nauru', country_code: 'nr' },
  { id: 147, nationality_name: 'Nepal', country_code: 'np' },
  { id: 148, nationality_name: 'Netherlands', country_code: 'nl' },
  { id: 149, nationality_name: 'New Caledonia', country_code: 'nc' },
  { id: 150, nationality_name: 'New Zealand', country_code: 'nz' },
  { id: 151, nationality_name: 'Nicaragua', country_code: 'ni' },
  { id: 152, nationality_name: 'Niger', country_code: 'ne' },
  { id: 153, nationality_name: 'Nigeria', country_code: 'ng' },
  { id: 154, nationality_name: 'Niue', country_code: 'nu' },
  { id: 155, nationality_name: 'Norfolk Island', country_code: 'nf' },
  { id: 156, nationality_name: 'Northern Mariana Islands', country_code: 'mp' },
  { id: 157, nationality_name: 'Norway', country_code: 'no' },
  { id: 158, nationality_name: 'Oman', country_code: 'om' },
  { id: 159, nationality_name: 'Pakistan', country_code: 'pk' },
  { id: 160, nationality_name: 'Palau', country_code: 'pw' },
  { id: 161, nationality_name: 'Palestinian Territory, Occupied', country_code: 'ps' },
  { id: 162, nationality_name: 'Panama', country_code: 'pa' },
  { id: 163, nationality_name: 'Papua New Guinea', country_code: 'pg' },
  { id: 164, nationality_name: 'Paraguay', country_code: 'py' },
  { id: 165, nationality_name: 'Peru', country_code: 'pe' },
  { id: 166, nationality_name: 'Philippines', country_code: 'ph' },
  { id: 167, nationality_name: 'Pitcairn', country_code: 'pn' },
  { id: 168, nationality_name: 'Poland', country_code: 'pl' },
  { id: 169, nationality_name: 'Portugal', country_code: 'pt' },
  { id: 170, nationality_name: 'Puerto Rico', country_code: 'pr' },
  { id: 171, nationality_name: 'Qatar', country_code: 'qa' },
  { id: 172, nationality_name: 'Reunion', country_code: 're' },
  { id: 173, nationality_name: 'Romania', country_code: 'ro' },
  { id: 174, nationality_name: 'Russian Federation', country_code: 'ru' },
  { id: 175, nationality_name: 'Rwanda', country_code: 'rw' },
  { id: 176, nationality_name: 'Saint Helena', country_code: 'sh' },
  { id: 177, nationality_name: 'Saint Kitts and Nevis', country_code: 'kn' },
  { id: 178, nationality_name: 'Saint Lucia', country_code: 'lc' },
  { id: 179, nationality_name: 'Saint Pierre and Miquelon', country_code: 'pm' },
  { id: 180, nationality_name: 'Saint Vincent and the Grenadines', country_code: 'vc' },
  { id: 181, nationality_name: 'Samoa', country_code: 'ws' },
  { id: 182, nationality_name: 'San Marino', country_code: 'sm' },
  { id: 183, nationality_name: 'Sao Tome and Principe', country_code: 'st' },
  { id: 184, nationality_name: 'Saudi Arabia', country_code: 'sa' },
  { id: 185, nationality_name: 'Senegal', country_code: 'sn' },
  { id: 186, nationality_name: 'Serbia and Montenegro', country_code: 'cs' },
  { id: 187, nationality_name: 'Seychelles', country_code: 'sc' },
  { id: 188, nationality_name: 'Sierra Leone', country_code: 'sl' },
  { id: 189, nationality_name: 'Singapore', country_code: 'sg' },
  { id: 190, nationality_name: 'Slovakia', country_code: 'sk' },
  { id: 191, nationality_name: 'Slovenia', country_code: 'si' },
  { id: 192, nationality_name: 'Solomon Islands', country_code: 'sb' },
  { id: 193, nationality_name: 'Somalia', country_code: 'so' },
  { id: 194, nationality_name: 'South Africa', country_code: 'za' },
  { id: 195, nationality_name: 'South Georgia and the South Sandwich Islands', country_code: 'gs' },
  { id: 196, nationality_name: 'Spain', country_code: 'es' },
  { id: 197, nationality_name: 'Sri Lanka', country_code: 'lk' },
  { id: 198, nationality_name: 'Sudan', country_code: 'sd' },
  { id: 199, nationality_name: 'Suriname', country_code: 'sr' },
  { id: 200, nationality_name: 'Svalbard and Jan Mayen', country_code: 'sj' },
  { id: 201, nationality_name: 'Swaziland', country_code: 'sz' },
  { id: 202, nationality_name: 'Sweden', country_code: 'se' },
  { id: 203, nationality_name: 'Switzerland', country_code: 'ch' },
  { id: 204, nationality_name: 'Syrian Arab Republic', country_code: 'sy' },
  { id: 205, nationality_name: 'Taiwan, Province of China', country_code: 'tw' },
  { id: 206, nationality_name: 'Tajikistan', country_code: 'tj' },
  { id: 207, nationality_name: 'Tanzania, United Republic of', country_code: 'tz' },
  { id: 208, nationality_name: 'Thailand', country_code: 'th' },
  { id: 209, nationality_name: 'Timor-Leste', country_code: 'tl' },
  { id: 210, nationality_name: 'Togo', country_code: 'tg' },
  { id: 211, nationality_name: 'Tokelau', country_code: 'tk' },
  { id: 212, nationality_name: 'Tonga', country_code: 'to' },
  { id: 213, nationality_name: 'Trinidad and Tobago', country_code: 'tt' },
  { id: 214, nationality_name: 'Tunisia', country_code: 'tn' },
  { id: 215, nationality_name: 'Turkey', country_code: 'tr' },
  { id: 216, nationality_name: 'Turkmenistan', country_code: 'tm' },
  { id: 217, nationality_name: 'Tuvalu', country_code: 'tv' },
  { id: 218, nationality_name: 'Uganda', country_code: 'ug' },
  { id: 219, nationality_name: 'Ukraine', country_code: 'ua' },
  { id: 220, nationality_name: 'United Arab Emirates', country_code: 'ae' },
  { id: 221, nationality_name: 'United Kingdom', country_code: 'gb' },
  { id: 222, nationality_name: 'United States', country_code: 'us' },
  { id: 224, nationality_name: 'Uruguay', country_code: 'uy' },
  { id: 225, nationality_name: 'Uzbekistan', country_code: 'uz' },
  { id: 226, nationality_name: 'Vanuatu', country_code: 'vu' },
  { id: 227, nationality_name: 'Vatican City', country_code: 'va' },
  { id: 228, nationality_name: 'Venezuela', country_code: 've' },
  { id: 229, nationality_name: 'Vietnam', country_code: 'vn' },
  { id: 230, nationality_name: 'Virgin Islands, British', country_code: 'vg' },
  { id: 231, nationality_name: 'Virgin Islands, U.S.', country_code: 'vi' },
  { id: 232, nationality_name: 'Wallis and Futuna', country_code: 'wf' },
  { id: 233, nationality_name: 'Yemen', country_code: 'ye' },
  { id: 234, nationality_name: 'Zambia', country_code: 'zm' },
  { id: 235, nationality_name: 'Zimbabwe', country_code: 'zw' }
])

const nationalityQuery = ref('')
const nationalityResult = ref([])
const isNationalityDropdownOpen = ref(false)
const showFlag = ref(false)
const selectedFlagImageUrl = ref('')

const loadNationalityData = () => {
  if (nationalityQuery.value.trim() !== '') {
    isNationalityDropdownOpen.value = true

    const filteredData = tempNationalityData.value.filter((nationality) => {
      return nationality.nationality_name
        .toLowerCase()
        .includes(nationalityQuery.value.trim().toLowerCase())
    })
    nationalityResult.value = filteredData
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
const getFlagImageUrl = (countryCode) => {
  const flagCode = countryCode

  return `https://flagcdn.com/48x36/${flagCode}.png`
}
const getNationality = (nationalityName, countryCode) => {
  nationalityQuery.value = nationalityName
  nationalityResult.value = []
  isNationalityDropdownOpen.value = false
  showFlag.value = true

  // Dapatkan URL gambar bendera menggunakan kode negara
  const flagImageUrl = getFlagImageUrl(countryCode)

  // Setel URL gambar bendera ke dalam selectedFlagImageUrl
  selectedFlagImageUrl.value = flagImageUrl
}
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
  if (nationalityQuery.value.trim() === '') {
    showFlag.value = false;
    selectedFlagImageUrl.value = ''
  }
})
onMounted(() => {
  loadNationalityData()
  document.addEventListener('click', closeDropdownOutside)
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
  :class="{ focus: isNationalityDropdownOpen, flag: showFlag }"
  :style="{backgroundImage: `url(${selectedFlagImageUrl})`}"
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
          <div
            class="nationality-item"
            @click="getNationality(result.nationality_name, result.country_code)"
          >
            <img :src="getFlagImageUrl(result.country_code)" class="flag-icon" />
            <p class="dropdown-nationality__name">{{ result.nationality_name }}</p>
          </div>
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
.nationality-dropdown__input.flag {
  background-repeat: no-repeat; 
  background-position: 1.5rem center; 
  padding-left: 4rem;
  background-size: 25px;
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
.nationality-item {
  display: flex;
  align-items: center;
}
.flag-icon {
  width: 25px;
  margin-right: 10px;
}
</style>
