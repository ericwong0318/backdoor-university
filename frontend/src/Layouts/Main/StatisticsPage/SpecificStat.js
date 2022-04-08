
import { 
    Legend, 
    Label, 
    ScatterChart, 
    Scatter, 
    XAxis, 
    YAxis, 
    ZAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer } from 'recharts';


const UST = [
	{ College: "HKCC", y: 3.2, z: "UST" , comment: "Test"},
	{ College: "SPACE", y: 3.5, z: "UST" },
	{ College: "HKCC", y: 3.0, z: "UST" },
	{ College: "IVE", y: 3.3, z: "UST" },
	{ College: "Other", y: 3.3, z: "UST" },
	{ College: "HKCC", y: 3.8, z: "UST" },
];

const CUHK = [
	{ College: "Other", y: 4, z: "CUHK" },
	{ College: "SPACE", y: 3.5, z: "CUHK" },
	{ College: "HKCC", y: 3.8, z: "CUHK" },
	{ College: "IVE", y: 3.7, z: "CUHK" },
	{ College: "Other", y: 3.6, z: "CUHK" },
	{ College: "HKCC", y: 3.99, z: "CUHK" },
];

const HKU = [
	{ College: "SPACE", y: 4, z: "HKU" },
	{ College: "SPACE", y: 3.95, z: "HKU" },
	{ College: "HKCC", y: 3.88, z: "HKU" },
	{ College: "IVE", y: 3.98, z: "HKU" },
	{ College: "Other", y: 3.5, z: "HKU" },
	{ College: "HKCC", y: 3.77, z: "HKU" },
];

function SpecStat() {
	return (
		<>

		<h1>Specific Programme Statistics</h1>
		<ResponsiveContainer width="90%" aspect={3}>
		<ScatterChart
				width={500}
				height={300}
				margin={{
					top: 30,
					right: 50,
					left: 50,
					bottom: 5,
				}}
			>
					<YAxis type="category" dataKey="College" allowDuplicatedCategory={false} label={{ offset:100, angle:-90, value: ''}}>
					<Label position="insideBottom" />
					</YAxis>
					<XAxis tickCount={11} type="number" domain={[3, 4]} dataKey="y" name="GPA" label={{ value: '', bottom: 100 , angle: 0, position: 'insideLeft' }} />
					<ZAxis  type="category" dataKey="z" range={[200, 200]} name="Uni Offer" />
					<Legend verticalAlign="top" align="right" height={36}/>
					<Tooltip labelFormatter={() => ""} />
					<CartesianGrid strokeDasharray="3 3" />
			
			<Scatter name="UST" data={UST} fill="purple" fillOpacity={0.5} >
			</Scatter>
			<Scatter name="CUHK" data={CUHK} fill="gold" fillOpacity={0.5} >
			</Scatter>

			<Scatter name="HKU" data={HKU} fill="orange" fillOpacity={0.5} >
			</Scatter>
		</ScatterChart>
		</ResponsiveContainer>
	</>
	);
}

export default SpecStat;