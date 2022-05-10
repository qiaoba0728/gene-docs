# 3.1.5 饱和度分析

<font face="微软雅黑" >&emsp;&emsp;我们使用 RSeQC 分析表达量饱和度，即：对测序结果按 5%，10%，15%...100% 的比例进行抽样，对不同的抽样比例分别计算所有基因表达量（即每个基因计算 20次），然后与实际表达量（假设 100% 抽样情况下得出的为实际表达量）进行比较，获得相对误差。饱和度分析主要目的是评估所测数据量是否足够用于正确计算基因表达量。理论上在较少数据量情况下基因的表达量与实际表达量偏差较大，而当数据量达到饱和阈值后，数据量再增长，基因表达量也近乎不变，此时基因表达量不再受数据量的影响。饱和度分析结果见图7。</font><br />


{{details}}
<center>图7 饱和度分析</center>