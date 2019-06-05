<template>
  <div >
    <div id="echartss">
    </div>
    <!-- <p>{{rdf}}</p>
    <p>--------------------</p>
    <div v-for="item in proxydata" :key="item.index">
        <p>{{item}}</p>
    </div>
    <p>--------------------</p>
    <div v-for="item in proxyedges" :key="item.index">
        <p>{{item}}</p>
    </div> -->
  </div>

</template>
<script>
import vue from 'vue'
import echarts from 'echarts'

export default {
  props: {
    rdf: Array,
    centersearch: String
  },
  data () {
    return{
        proxydata: [],
        proxydatacopy: [],
        proxyedges: [],
        proxyedgescopy: [],
        shouldRefresh: true,
        chart_rdf: [],
        temprelation: '', //临时关系
        option: {
          series: [{
            type: 'graph',
            layout: 'force',
            animation: true,
            roam: true,
            data: [],
            draggable: true,
            categories: [{},{},{}],
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: function(params){
                  return params.data.name;//返回标签
                },
              }
            },
            lineStyle : {//==========关系边的公用线条样式。
              normal : {
                  show: true,
                  color : 'rgba(0,0,0,0.4)',
                  width : '3',
                  type : 'solid',
                  curveness : 0,
                  opacity : 1
              },
            },
             edgeLabel : {//==============线条的边缘标签 
                normal : {
                    show : true
                },
            },
            force: {
                initLayout: 'circular',
                gravity: 0.03,
                repulsion: 200,
                edgeLength: 250
            },
            edges: [],
          }]
        }
    }
  },
  computed:{
  },
  mounted () {
    // 绘制图表，this.echarts1_option是数据
    this.chart_rdf = this.rdf
    this.init();
  },
  methods: {
      init: function(){
        var that = this;
        var myChart = echarts.init(document.getElementById('echartss'));
        myChart.on('click',function (param) {
          if(param.dataType == 'node'){
            if(param.data.click == true){
              that.onChartClickmovie(param.data);
            }else{
              that.onChartClickperson(param.data);
            }
          }
        });
        this.temprelation = '演员'
        this.proxydata.push({
          id : this.chart_rdf[0].id,
          category : 0,
          name : this.chart_rdf[0].name,
          symbol : 'circle',
          value : this.temprelation,
          symbolSize : 40,
          fixd: true,
          click: false
        })
        for(var i=0;i<this.chart_rdf[0].works.length;i++){
          vue.axios.get('http://editme.top:8001/api/v3/movie/', {
            params: {
              id: this.chart_rdf[0].works[i].id
            }
          }).then(response => {
            var temp = response.data
            that.addNode({
              id : temp._id,
              category : 1,
              name : temp.title +'上映年份:'+temp.year,
              symbol : 'circle',
              value : this.temprelation,
              symbolSize : 40,
              fixd: true,
              click: true
            })

            that.addEdge({source: this.chart_rdf[0]._id,target: temp._id})
            that.drawchart()
          }).catch(error => {
            console.log(error)
          })
        }
      },
      //画
      drawchart() {
        var myChart = echarts.init(document.getElementById('echartss'));
        console.log(this.option.series[0].data)
        myChart.setOption(this.option);

      },
      //加点
      addNode(node) {
        // if (!this.proxydata.has(node))
        // if(this.proxydatacopy.indexOf(node.id) < 0){
        //   this.proxydatacopy.push(node.id)
        //   this.proxydata.push(node)
        // }
        var index = 0;
        for(var i=0;i<this.proxydata.length;i++){
          if(node.id == this.proxydata[i].id){
            break;
          }else{
            index++;
          }
        }
        if(index == this.proxydata.length){
          this.proxydata.push(node)
        }
        //var set = new Set(this.proxydata);Array.from(set)
        this.option.series[0].data = this.proxydata
      },
      //加边
      addEdge(edge) {
          //if (!this.proxyedges.has(edge))
          // this.proxyedgescopy.push(node.id)
          this.proxyedges.push(edge)
          this.option.series[0].edges = this.proxyedges
          // var set = new Set(this.proxyedges);
          // this.option.series[0].edges = Array.from(set)
      },
      //请求数据
      httpMovie(id) {
        var that = this;
        vue.axios.get('http://editme.top:8001/api/v3/person/', {
            params: {
              id: id
            }
          }).then(response => {
            var temp1 = response.data;
            // that.$emit('childmessage',temp1.summary)
            if (temp1.works.length <= 0) return 0;
            for(var i=0;i<temp1.works.length;i++){
              if(temp1.works[i] != null){
                vue.axios.get('http://editme.top:8001/api/v3/movie/', {
                  params: {
                    id: temp1.works[i].id
                  }
                }).then(response => {
                  var temp2 = response.data
                  if (temp2._id != undefined) {
                    that.addNode({
                      id : temp2._id,
                      category : 3,
                      name : temp2.title,
                      symbol : 'circle',
                      value : '演员',
                      symbolSize : 40,
                      fixd: true,
                      click: false
                    })
                    that.addEdge({source: temp1._id,target: temp2._id})
                    that.drawchart()
                  }
                }).catch(error => {
                  console.log(error)
                })
              }
            }
          }).catch(error => {
            console.log(error)
          })
      },
      httpPerson(id) {
        var that = this;
        vue.axios.get('http://editme.top:8001/api/v3/movie/', {
            params: {
              id: id
            }
          }).then(response => {
            var temp1 = response.data;
            if (temp1.writers.length <= 0) return 0;
            for(var i=0;i<temp1.writers.length;i++){
              if(temp1.writers[i] != null){
                vue.axios.get('http://editme.top:8001/api/v3/person/', {
                  params: {
                    id: temp1.writers[i]
                  }
                }).then(response => {
                  var temp2 = response.data;
                  if (temp2._id != undefined) {
                    that.addNode({
                      id : temp2._id,
                      category : 2,
                      name : temp2.name,
                      symbol : 'circle',
                      value : temp2.professions[0],
                      symbolSize : 40,
                      fixd: true,
                      click: false
                    })
                    that.addEdge({source: temp1._id,target: temp2._id})
                    that.drawchart()
                  }
                }).catch(error => {
                  console.log(error)
                })
              }
            }
          }).catch(error => {
            console.log(error)
          })
      },
      //点击电影节点事件
      onChartClickmovie: function(param){
        console.log('child')
        this.$emit('childmessage',param)
        this.httpPerson(param.id)
      },

      onChartClickperson: function(param){
        console.log('child')
        this.$emit('childmessage',param)
        this.httpMovie(param.id)
      }
  }
}
</script>
<style lang="stylus">
#echartss
  width 100%
  height 100vh
  box-sizing border-box
</style>
