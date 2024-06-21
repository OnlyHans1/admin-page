<template>
  <div>
    <P>Revenue Keraton</P>
    <p>{{"CIH: " + revenueKeraton.CIH }}</p>
    <p>{{"CIO: " + revenueKeraton.CIO }}</p>
  </div>
  <div>
    <P>Revenue Curaweda {{ revenueCuraweda }}</P>
  </div>

</template>
<script>
import GlobalHelper from '../utilities/GlobalHelper';
const { DB_BASE_URL, TRANSACTION_BASE_URL } = GlobalHelper
export default {
  data(){
    return{
      revenueCuraweda: ref(0),
      revenueKeraton: ref({ CIH: 0, CIA: 0 })
    }
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    async fetchData(){
      try{
        const response = await fetch(`${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/income-revenue`)
        if(!response.ok) throw Error('Failed to fetch Data')
        const responseData = await response.json()
        this.revenueKeraton = responseData.data.revenueKeraton,
        this.revenueCuraweda = responseData.data.revenueCuraweda
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>