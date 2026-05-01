import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function HomeChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={[
        { name: 'Performance', value: 72 },
        { name: 'SEO', value: 85 },
        { name: 'Security', value: 62 },
        { name: 'UX', value: 78 }
      ]}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} />
        <YAxis stroke="#a3a3a3" fontSize={12} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(99,102,241,0.3)' }}
          cursor={{ fill: 'rgba(99,102,241,0.1)' }}
        />
        <Bar dataKey="value" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  )
}
