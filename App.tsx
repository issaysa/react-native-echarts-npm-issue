import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';
// import {SVGRenderer, SvgChart} from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LineChart} from 'echarts/charts';
import {
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components';

echarts.use([
  SVGRenderer,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
]);

const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('window').width;

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
for (let i = 1; i < 20000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

const option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    },
  },
  title: {
    left: 'center',
    text: 'Large Area Chart',
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: date,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)',
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)',
          },
        ]),
      },
      data: data,
    },
  ],
};

export default function App() {
  const skiaRef = useRef(null);
  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>SkiaCHart</Text>
        <SkiaChart ref={skiaRef} useRNGH />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
