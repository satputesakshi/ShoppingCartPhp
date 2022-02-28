<template>
  <div id="app">
    <!-- <StarRating v-model="star" :star="this.star" :disabled="this.disabled" :maxstars="this.maxstars" :starsize="this.starsize" :hasresults="this.hasresults" :hasdescription="this.hasdescription" :ratingdescription="this.ratingdescription"/>
   -->
   <div v-if="message!= ''" class="alert alert-secondary" role="alert">
  {{message}}
</div>
   <star-rating class="star" v-model="star"/>
   <form @submit.prevent="addReview">
    
  <div class="form-group">
              
              <input v-model="reviewText"
                type="text"
                class="mt-2 align-items-center form-control form-control-lg"
                placeholder="Write a review"
                required
              />
          
            <button class="mt-2 btn btn-lg btn-primary" type="submit">
              Post review
            </button>
  </div>
  </form>
  </div>
  
</template>

<script>
import AwesomeVueStarRating from 'awesome-vue-star-rating'
import StarRating from 'vue-star-rating'
export default {
  name: 'App',
  components: {
    AwesomeVueStarRating,
    StarRating
  },
  data() {
    return {
      star: 5,
      ratingdescription: [
        {
          text: 'Poor',
          class: 'star-poor'
        },
        {
          text: 'Below Average',
          class: 'star-belowAverage'
        },
        {
          text: 'Average',
          class: 'star-average'
        },
        {
          text: 'Good',
          class: 'star-good'
        },
        {
          text: 'Excellent',
          class: 'star-excellent'
        }
      ],
      hasresults: true,
      hasdescription: true,
      starsize: '1x', //[xs,lg,1x,2x,3x,4x,5x,6x,7x,8x,9x,10x],
      maxstars: 5,
      disabled: false,
      reviewText: "",
      message: ""
    }
  },
  methods: {
    addReview() {
      //  "productId": payload.productId,
      //       "custName": payload.custName,
      //       "rate": payload.rate,
      //       "comment": payload.comment
      this.$store.dispatch("addReview",{ productId:this.productId,comment: this.reviewText,rate: this.star,custName:this.username, created: new Date().toLocaleString()})
    this.message="Review added successfully"
    }
  },
  computed:{
    username(){
      return this.$store.state.username;
    },
    reviews(){
      return this.$store.state.reviews.length;
    }
  }
}
</script>
<style >
/** Customise Star color **/
.star {
	 color: yellow;
}
 .star.active {
	 color: yellow;
}
 .list:hover .star, .list.disabled:hover .star {
	 color: yellow !important;
}
 .list:hover .star.active, .list.disabled:hover .star.active {
	 color: yellow;
}
.form-group {
  text-align: -webkit-center
}
</style>