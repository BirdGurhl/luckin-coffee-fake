<template>
    <div>
        {{title}}

        <!-- 我修改 title的值 -->

        <button @click="change">修改title</button>
    </div>
</template>

<script>
    export default {
        // 接受父组件传递过来的值，并限定其数据类型
        props:{
            title:String
        },
        
        // 
        methods:{
            change(){
                this.title = "我五五开没有开挂";
                // this.$emit("fchange",{str:"我五五开没有开挂！"})
            }
        }
    }
</script>

