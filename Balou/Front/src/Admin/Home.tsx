import { BsFillGrid3X3GapFill, BsPeopleFill } from "react-icons/bs";
  import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, LineChart, Line, Rectangle
  } from 'recharts';
  import { useState } from 'react';
  import Appointments from '../component/appointments/Appointments';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { BsFillArchiveFill, BsFillBellFill } from 'react-icons/bs';
  
function Home() {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' ou 'appointments'

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  


    return(
        <main className="main-container">
            <div className="main-title">
                <h3>Tableau de Bord</h3>
                <div className="tab-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>  
                    <button 
                        onClick={() => setActiveView('dashboard')}
                        className={activeView === 'dashboard' ? 'active-tab' : 'tab-btn'}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: activeView === 'dashboard' ? '#007bff' : '#f8f9fa',
                            color: activeView === 'dashboard' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={() => setActiveView('appointments')}
                        className={activeView === 'appointments' ? 'active-tab' : 'tab-btn'}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: activeView === 'appointments' ? '#007bff' : '#f8f9fa',
                            color: activeView === 'appointments' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Rendez-vous
                    </button>
                </div>
            </div>

            {activeView === 'appointments' ? (
                <Appointments />
            ) : (
              <>
                <div className="main-cards">
                  
                  <div className="card">
                      <div className="card-inner">
                          <h3>Rendevous</h3>
                          <BsFillGrid3X3GapFill className="card-icon"/>
                      </div>
                      <h1>12</h1>
                  </div>

                  <div className="card">
                      <div className="card-inner">
                          <h3>Utilisateur</h3>
                          <BsPeopleFill className="card-icon"/>
                      </div>
                      <h1>33</h1>
                  </div>
{/* 
                <div className="card">
                    <div className="card-inner">
                        <h3>ALERTS</h3>
                        <BsFillBellFill className="card-icon"/>
                    </div>
                    <h1>42</h1>
                </div> */}
                </div>
                
                <div className="charts">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                      <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}

        </main>
    )
}

export default Home