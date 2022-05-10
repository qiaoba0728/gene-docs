# 3.2 表达差异分析

## 3.2.1 样品差异表达检测

<font face="微软雅黑" >&emsp;&emsp;我们采用 DESeq 对基因表达进行差异分析，筛选差异表达基因条件为：表达差异倍数 |log2FoldChange| > 1 ，显著性P-value < 0.05 ，部分差异分析结果见表1，不同分组之间的差异表达基因统计结果见 表2</font><br />


|  Treat| Control| Up-regulated|   Down-regulated| Total|  
| :---: | :---: | :---: | :---: | :---: | 
{{table}}

**注**：
- Treat：实验组样本；
- Control：对照组样本；
- Up-regulated Genes：Case 相比于Control 上调表达基因；
- Down-regulated Genes：Case 相比于Control 下调表达的基因；
- Total: 上调和下调基因的总和


<details open><summary></summary><center><img src='../asset/all_down_up.png'></center></details>
<center>图8 表达差异分析结果统计</center>
<font face="微软雅黑" >&emsp;&emsp;采用R语言 ggplots2 软件包绘制差异表达基因的火山图和 MA 图，见图9和图10。火山图展示的是基因分布情况，基因的表达倍数差异和显著性结果，正常状况下，该图左右差异基因分布应大致对称，左侧为 Case 相比于 Control 下调基因，右侧为 Case 相比于 Control 上调基因。MA 图常用来展示标准化后的基因分布情况，一般标准化后，基因的表达量呈对称分布，即表达差异趋势不随基因表达量变化而发生偏向。</font><br />

{{volcanos_detail}}

<center>图9 差异表达基因的火山图</center>

{{maplots_detail}}
<center>图10 差异表达基因MA图</center>

{{result}}