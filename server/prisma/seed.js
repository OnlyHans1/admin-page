const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Teddy Lazuardi',
    email: 'TeddyLazuardi@gmail.com',
    number: '085678901234',
    password: 'Teddy1234',
    role: 'ADMIN'
  }
]

const orderData = [
  {
    name: 'Tiket masuk Keraton Kasepuhan Cirebon',
    price: 10000.0,
    category: 'UMUM'
  },
  {
    name: 'Tiket masuk Keraton Kasepuhan Cirebon',
    price: 10000.0,
    category: 'PELAJAR'
  },
  {
    name: 'Tiket masuk Keraton Kasepuhan Cirebon',
    price: 10000.0,
    category: 'MANCANEGARA'
  },
  {
    name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
    price: 30000.0,
    category: 'UMUM'
  },
  {
    name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
    price: 30000.0,
    category: 'PELAJAR'
  },
  {
    name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
    price: 30000.0,
    category: 'MANCANEGARA'
  },
  {
    name: 'Bertemu Pangeran',
    price: 25000.0,
    category: 'UMUM'
  },
  {
    name: 'Bertemu Pangeran',
    price: 25000.0,
    category: 'PELAJAR'
  },
  {
    name: 'Bertemu Pangeran',
    price: 25000.0,
    category: 'MANCANEGARA'
  },
  {
    name: 'Event bulanan',
    price: 15000.0,
    category: 'UMUM',
    interval: 'PERBULAN'
  },
  {
    name: 'Event bulanan',
    price: 15000.0,
    category: 'PELAJAR',
    interval: 'PERBULAN'
  },
  {
    name: 'Event bulanan',
    price: 15000.0,
    category: 'MANCANEGARA',
    interval: 'PERBULAN'
  },
  {
    name: 'Event mingguan',
    price: 15000.0,
    category: 'UMUM',
    interval: 'PERMINGGU'
  },
  {
    name: 'Event mingguan',
    price: 15000.0,
    category: 'PELAJAR',
    interval: 'PERMINGGU'
  },
  {
    name: 'Event mingguan',
    price: 15000.0,
    category: 'MANCANEGARA',
    interval: 'PERMINGGU'
  }
]

const nationalityData = [
  { name: 'Afghanistan', code: 'af' },
  { name: 'Albania', code: 'al' },
  { name: 'Algeria', code: 'dz' },
  { name: 'American Samoa', code: 'as' },
  { name: 'Andorra', code: 'ad' },
  { name: 'Angola', code: 'ao' },
  { name: 'Anguilla', code: 'ai' },
  { name: 'Antarctica', code: 'aq' },
  { name: 'Antigua and Barbuda', code: 'ag' },
  { name: 'Argentina', code: 'ar' },
  { name: 'Armenia', code: 'am' },
  { name: 'Aruba', code: 'aw' },
  { name: 'Australia', code: 'au' },
  { name: 'Austria', code: 'at' },
  { name: 'Azerbaijan', code: 'az' },
  { name: 'Bahamas', code: 'bs' },
  { name: 'Bahrain', code: 'bh' },
  { name: 'Bangladesh', code: 'bd' },
  { name: 'Barbados', code: 'bb' },
  { name: 'Belarus', code: 'by' },
  { name: 'Belgium', code: 'be' },
  { name: 'Belize', code: 'bz' },
  { name: 'Benin', code: 'bj' },
  { name: 'Bermuda', code: 'bm' },
  { name: 'Bhutan', code: 'bt' },
  { name: 'Bolivia', code: 'bo' },
  { name: 'Bosnia and Herzegovina', code: 'ba' },
  { name: 'Botswana', code: 'bw' },
  { name: 'Bouvet Island', code: 'bv' },
  { name: 'Brazil', code: 'br' },
  { name: 'Brunei Darussalam', code: 'bn' },
  { name: 'Bulgaria', code: 'bg' },
  { name: 'Burkina Faso', code: 'bf' },
  { name: 'Burundi', code: 'bi' },
  { name: 'Cambodia', code: 'kh' },
  { name: 'Cameroon', code: 'cm' },
  { name: 'Canada', code: 'ca' },
  { name: 'Cape Verde', code: 'cv' },
  { name: 'Cayman Islands', code: 'ky' },
  { name: 'Central African Republic', code: 'cf' },
  { name: 'Chad', code: 'td' },
  { name: 'Chile', code: 'cl' },
  { name: 'China', code: 'cn' },
  { name: 'Colombia', code: 'co' },
  { name: 'Comoros', code: 'km' },
  { name: 'Congo', code: 'cg' },
  { name: 'Costa Rica', code: 'cr' },
  { name: 'Croatia', code: 'hr' },
  { name: 'Cuba', code: 'cu' },
  { name: 'Cyprus', code: 'cy' },
  { name: 'Czech Republic', code: 'cz' },
  { name: 'Denmark', code: 'dk' },
  { name: 'Djibouti', code: 'dj' },
  { name: 'Dominica', code: 'dm' },
  { name: 'Dominican Republic', code: 'do' },
  { name: 'East Timor', code: 'tl' },
  { name: 'Ecuador', code: 'ec' },
  { name: 'Egypt', code: 'eg' },
  { name: 'El Salvador', code: 'sv' },
  { name: 'Equatorial Guinea', code: 'gq' },
  { name: 'Eritrea', code: 'er' },
  { name: 'Estonia', code: 'ee' },
  { name: 'Ethiopia', code: 'et' },
  { name: 'Falkland Islands (Malvinas)', code: 'fk' },
  { name: 'Faroe Islands', code: 'fo' },
  { name: 'Fiji', code: 'fj' },
  { name: 'Finland', code: 'fi' },
  { name: 'France', code: 'fr' },
  { name: 'French Guiana', code: 'gf' },
  { name: 'French Polynesia', code: 'pf' },
  { name: 'Gabon', code: 'ga' },
  { name: 'Gambia', code: 'gm' },
  { name: 'Georgia', code: 'ge' },
  { name: 'Germany', code: 'de' },
  { name: 'Ghana', code: 'gh' },
  { name: 'Gibraltar', code: 'gi' },
  { name: 'Greece', code: 'gr' },
  { name: 'Greenland', code: 'gl' },
  { name: 'Grenada', code: 'gd' },
  { name: 'Guadeloupe', code: 'gp' },
  { name: 'Guam', code: 'gu' },
  { name: 'Guatemala', code: 'gt' },
  { name: 'Guinea', code: 'gn' },
  { name: 'Guinea-Bissau', code: 'gw' },
  { name: 'Guyana', code: 'gy' },
  { name: 'Haiti', code: 'ht' },
  { name: 'Honduras', code: 'hn' },
  { name: 'Hong Kong', code: 'hk' },
  { name: 'Hungary', code: 'hu' },
  { name: 'Iceland', code: 'is' },
  { name: 'India', code: 'in' },
  { name: 'Iran', code: 'ir' },
  { name: 'Iraq', code: 'iq' },
  { name: 'Ireland', code: 'ie' },
  { name: 'Israel', code: 'il' },
  { name: 'Italy', code: 'it' },
  { name: 'Jamaica', code: 'jm' },
  { name: 'Japan', code: 'jp' },
  { name: 'Jordan', code: 'jo' },
  { name: 'Kazakhstan', code: 'kz' },
  { name: 'Kenya', code: 'ke' },
  { name: 'Kiribati', code: 'ki' },
  { name: 'North Korea', code: 'kp' },
  { name: 'South Korea', code: 'kr' },
  { name: 'Kuwait', code: 'kw' },
  { name: 'Kyrgyzstan', code: 'kg' },
  { name: 'Laos ', code: 'la' },
  { name: 'Latvia', code: 'lv' },
  { name: 'Lebanon', code: 'lb' },
  { name: 'Lesotho', code: 'ls' },
  { name: 'Liberia', code: 'lr' },
  { name: 'Libya', code: 'ly' },
  { name: 'Liechtenstein', code: 'li' },
  { name: 'Lithuania', code: 'lt' },
  { name: 'Luxembourg', code: 'lu' },
  { name: 'Macau', code: 'mo' },
  { name: 'Macedonia', code: 'mk' },
  { name: 'Madagascar', code: 'mg' },
  { name: 'Malawi', code: 'mw' },
  { name: 'Malaysia', code: 'my' },
  { name: 'Maldives', code: 'mv' },
  { name: 'Mali', code: 'ml' },
  { name: 'Malta', code: 'mt' },
  { name: 'Marshall Islands', code: 'mh' },
  { name: 'Martinique', code: 'mq' },
  { name: 'Mauritania', code: 'mr' },
  { name: 'Mauritius', code: 'mu' },
  { name: 'Mayotte', code: 'yt' },
  { name: 'Mexico', code: 'mx' },
  { name: 'Micronesia', code: 'fm' },
  { name: 'Moldova', code: 'md' },
  { name: 'Monaco', code: 'mc' },
  { name: 'Mongolia', code: 'mn' },
  { name: 'Montenegro', code: 'me' },
  { name: 'Montserrat', code: 'ms' },
  { name: 'Morocco', code: 'ma' },
  { name: 'Mozambique', code: 'mz' },
  { name: 'Myanmar', code: 'mm' },
  { name: 'Namibia', code: 'na' },
  { name: 'Nauru', code: 'nr' },
  { name: 'Nepal', code: 'np' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'New Caledonia', code: 'nc' },
  { name: 'New Zealand', code: 'nz' },
  { name: 'Nicaragua', code: 'ni' },
  { name: 'Niger', code: 'ne' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Niue', code: 'nu' },
  { name: 'Norfolk Island', code: 'nf' },
  { name: 'Northern Mariana Islands', code: 'mp' },
  { name: 'Norway', code: 'no' },
  { name: 'Oman', code: 'om' },
  { name: 'Pakistan', code: 'pk' },
  { name: 'Palau', code: 'pw' },
  { name: 'Palestine', code: 'ps' },
  { name: 'Panama', code: 'pa' },
  { name: 'Papua New Guinea', code: 'pg' },
  { name: 'Paraguay', code: 'py' },
  { name: 'Peru', code: 'pe' },
  { name: 'Philippines', code: 'ph' },
  { name: 'Poland', code: 'pl' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Puerto Rico', code: 'pr' },
  { name: 'Qatar', code: 'qa' },
  { name: 'Reunion', code: 're' },
  { name: 'Romania', code: 'ro' },
  { name: 'Russia', code: 'ru' },
  { name: 'Rwanda', code: 'rw' },
  { name: 'Saint Helena', code: 'sh' },
  { name: 'Saint Kitts and Nevis', code: 'kn' },
  { name: 'Saint Lucia', code: 'lc' },
  { name: 'Saint Pierre and Miquelon', code: 'pm' },
  { name: 'Saint Vincent and the Grenadines', code: 'vc' },
  { name: 'Samoa', code: 'ws' },
  { name: 'San Marino', code: 'sm' },
  { name: 'Sao Tome and Principe', code: 'st' },
  { name: 'Saudi Arabia', code: 'sa' },
  { name: 'Senegal', code: 'sn' },
  { name: 'Serbia', code: 'rs' },
  { name: 'Seychelles', code: 'sc' },
  { name: 'Sierra Leone', code: 'sl' },
  { name: 'Singapore', code: 'sg' },
  { name: 'Slovakia', code: 'sk' },
  { name: 'Slovenia', code: 'si' },
  { name: 'Solomon Islands', code: 'sb' },
  { name: 'Somalia', code: 'so' },
  { name: 'South Africa', code: 'za' },
  { name: 'Spain', code: 'es' },
  { name: 'Sri Lanka', code: 'lk' },
  { name: 'Sudan', code: 'sd' },
  { name: 'Suriname', code: 'sr' },
  { name: 'Svalbard and Jan Mayen', code: 'sj' },
  { name: 'Swaziland', code: 'sz' },
  { name: 'Sweden', code: 'se' },
  { name: 'Switzerland', code: 'ch' },
  { name: 'Syria', code: 'sy' },
  { name: 'Taiwan', code: 'tw' },
  { name: 'Tajikistan', code: 'tj' },
  { name: 'Tanzania', code: 'tz' },
  { name: 'Thailand', code: 'th' },
  { name: 'Timor-Leste', code: 'tl' },
  { name: 'Togo', code: 'tg' },
  { name: 'Tokelau', code: 'tk' },
  { name: 'Tonga', code: 'to' },
  { name: 'Trinidad and Tobago', code: 'tt' },
  { name: 'Tunisia', code: 'tn' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Turkmenistan', code: 'tm' },
  { name: 'Tuvalu', code: 'tv' },
  { name: 'Uganda', code: 'ug' },
  { name: 'Ukraine', code: 'ua' },
  { name: 'United Arab Emirates', code: 'ae' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'United States', code: 'us' },
  { name: 'Uruguay', code: 'uy' },
  { name: 'Uzbekistan', code: 'uz' },
  { name: 'Vanuatu', code: 'vu' },
  { name: 'Vatican City', code: 'va' },
  { name: 'Venezuela', code: 've' },
  { name: 'Vietnam', code: 'vn' },
  { name: 'Virgin Islands, British', code: 'vg' },
  { name: 'Virgin Islands, U.S.', code: 'vi' },
  { name: 'Wallis and Futuna', code: 'wf' },
  { name: 'Yemen', code: 'ye' },
  { name: 'Zambia', code: 'zm' },
  { name: 'Zimbabwe', code: 'zw' }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const o of orderData) {
    const order = await prisma.order.create({
      data: o
    })
    console.log(`Created order with id: ${order.id}`)
  }
  console.log(`Seeding finished.`)
  for (const n of nationalityData) {
    const nationality = await prisma.nationality.create({
      data: n
    })
    console.log(`Created nationality with id: ${nationality.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
