# 1.4 有参转录组分析流程

<font face="微软雅黑" >&emsp;&emsp;首先对原始下机数据（Raw Data）进行过滤，将过滤后得到的高质量序列(Clean Data)比对到该物种的参考基因组上。</font><br />

<font face="微软雅黑" >&emsp;&emsp;根据比对结果，计算每个基因的表达量。在此基础上，进一步对样品进行表达差异分析、富集分析和聚类分析。对比对上的 Reads 进行拼接，还原出转录本序列。</font><br />

```mermaid
graph TD
subgraph 数据质控和过滤
    A[测序下记数据] -->B[数据过滤]
	B[数据过滤]-->C[数据质量评估]
end
subgraph 参考基因组比对
    C[数据质量评估] --> D[比对到基因组]
	D[比对到基因组] --> E[比对结果评估]
end
subgraph 分析
    E[比对结果评估] --> F[表达量计算]
	F[表达量计算] --> G[差异表达分析]
	G[差异表达分析] -->H[GO/KEGG富集分析]
	G[差异表达分析] --> I[聚类分析]
end

```
