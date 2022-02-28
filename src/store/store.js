import Vue from 'vue'
import Vuex from 'vuex'
import shoe1 from '../assets/shoe1.jpg'
import whiteshoe from '../assets/whiteshoe.jpg'
import redshoes from '../assets/redshoes.jpg'
import blueshoe from '../assets/blueshoe.jpg'
import yellowsneaker from '../assets/yellowsneaker.jpg'
import darkyellow from '../assets/darkyellow.jpg'
import jordan from '../assets/jordan.jpg'
import nike from '../assets/nike.jpg'
import yellowsock from '../assets/yellowsock.jpg'
import stance from '../assets/stance.png'
import nikesock from '../assets/nikesock.png'
import Axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // bestsellers: [{ id: 1, name: 'Nike Trainers', price: 50, url: shoe1, desc: "The Perfect Trainers", rate: 4.1 }, { id: 2, name: 'Low Jordans', price: 120, url: blueshoe, desc: 'Show Your AJ1 Appeal', rate: 4.1 }, { id: 3, name: 'Mesh Trainers', price: 200, url: whiteshoe, desc: "Lightweight & Sturdy", rate: 4.2 }],

        // bestFinds: [{ id: 4, name: 'Nike Mids', price: 80, url: nike, desc: "Classic Kicks from '72", rate: 4.5 }, { id: 5, name: 'Nike Jordan 1 Low', price: 130, url: jordan, desc: "The Iconic Jordan 1'S", rate: 4.0 }, { id: 6, name: 'VANS', price: 60, url: darkyellow, desc: "Especially for Skaters", rate: 4.2 }],

        // essentials: [{ id: 7, name: 'Compression Socks', price: 200, url: yellowsock, desc: "Perfect Comoression Socks", rate: 4.2 }, { id: 8, name: 'Football Socks', price: 80, url: stance, desc: "Perfect Football Socks", rate: 4.2 }, { id: 9, name: 'Trainer Socks', price: 110, url: nikesock, desc: "The Perfect Trainer Socks", rate: 4.4 }],
        bestsellers: [],

        bestFinds: [],

        essentials: [],

        count: 0,
        cartItemCount: 0,
        cartItems: [],
        totalPrice: 0,
        todos: [{ id: 1, name: "Shopping at 7", done: true }, { id: 2, name: "Learn Vue", done: true }, { id: 1, name: "Gaming", done: false }],
        isLoggedIn: false,
        username: "Sakshi Satpute",
        reviews: []
    },
    mutations: {
        increment(state) {
            state.count++
        },
        addToCart(state, payload) {
            let item = payload;
            item = { ...item, quantity: 1 };
            if (state.cartItems.length > 0) {
                let bool = state.cartItems.some(
                    i => i.id == item.id
                );
                if (bool == true) {
                    let itemIndex = state.cartItems.findIndex(
                        el => el.id == item.id
                    );
                    state.cartItems[itemIndex]["quantity"] += 1;
                } else {
                    state.cartItems.push(item);
                }
            } else {
                state.cartItems.push(item);
            }
            state.cartItemCount++
        },
        removeItem(state, payload) {
            if (state.cartItems.length > 0) {
                let bool = state.cartItems.some(
                    i => i.id == payload.id
                );
                console.log('bool', bool)
                if (bool) {
                    let index = state.cartItems.findIndex(
                        el => el.id == payload.id
                    );
                    //to prevent quantity from being negative
                    state.cartItems[index]["quantity"] === 0
                        ? (state.cartItems[index]["quantity"] = 0)
                        : (state.cartItems[index]["quantity"] -= 1);
                    if (state.cartItems[index]["quantity"] === 0)
                        state.cartItems.splice(index, 1)
                    if (state.cartItemCount !== 0)
                        state.cartItemCount--
                }
            }
        },
        setisLoggedIn(state, payload) {
            state.isLoggedIn = payload
        },
        addReview(state, payload) {
            const reviews = [...state.reviews]
            reviews.unshift(payload)
            state.reviews = reviews
        },
        resetCart(state){
            state.cartItems= []
            state.cartItemCount=0
            state.count=0
        },
        setProducts(state,payload){
            state.bestsellers=payload.bestsellers;
            state.bestFinds=payload.bestFinds;
            state.essentials=payload.essentials;

        },
        setReviews(state,payload){
            state.reviews=payload
        }

    },
    actions: {
        addToCart: (context, payload) => {
            context.commit('addToCart', payload)
        },
        removeItem: (context, payload) => {
            context.commit('removeItem', payload)
        },
        increment: (context, payload) => {
            setTimeout(() => {
                context.commit('increment')
            }, 5000)
        },
        fetchProducts: (context, payload) => {
           Axios.get("http://localhost/ShoppingCart/api/products/read.php").then( res => {
               const data= res.data;
               const bestsellers = data.filter(d => d.type == 'Best Sellers' );
               const bestFinds = data.filter(d => d.type == 'Best Finds' );
               const essentials = data.filter(d => d.type == 'Essentials' );
               context.commit('setProducts',{bestsellers,bestFinds,essentials})
           });
        },
        fetchComments: (context, payload) => {
            Axios.get("http://localhost/ShoppingCart/api/review/read.php").then( res => {
                const data= res.data;
                context.commit('setReviews',data)
            });
         },
         addReview: (context,payload) => {
           Axios.post("http://localhost/ShoppingCart/api/review/create.php",{
      
            "productId": payload.productId,
            "custName": payload.custName,
            "rate": payload.rate,
            "comment": payload.comment
        }).then( res => {
            const data= res.data;
            context.dispatch('fetchComments')  
         });
        }
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})