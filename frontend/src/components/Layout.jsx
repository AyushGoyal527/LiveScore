import React from 'react';
import {NavLink,Outlet,useNavigate} from 'react-router-dom';
import {Activity,Trophy,Users,CalendarDays,LogOut,ShieldCheck,Search,Bell,ChevronDown,Table2,History} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
export default function Layout(){
 const {user,logout}=useAuth(),nav=useNavigate();
 const links=[['/',Activity,'Dashboard'],['/tournaments',Trophy,'Tournaments'],['/teams',Users,'Teams'],['/matches',CalendarDays,'Matches'],['/matches',Table2,'Points & standings'],['/matches',History,'Match history']];
 return <div className="app-shell">
  <aside className="sidebar">
   <NavLink to="/" className="brand"><span className="brand-icon"><Trophy size={24}/></span><span>Live<span className="brand-accent">Score</span><small>PLAY · SCORE · FOLLOW</small></span></NavLink>
   <div className="nav-label">WORKSPACE</div><nav>{links.map(([to,Icon,label],i)=><NavLink key={label} to={to} end={i===0}><Icon/><span>{label}</span>{label==='Matches'&&<span className="nav-count">4</span>}</NavLink>)}{user?.role==='admin'&&<NavLink to="/admin"><ShieldCheck/><span>Admin panel</span></NavLink>}</nav>
   <div className="sidebar-promo"><div className="promo-ball">🏆</div><b>Make every match count.</b><span>Bring your local sports community together.</span><NavLink to="/tournaments">Explore events <span>↗</span></NavLink></div>
   <div className="sidebar-bottom"><div className="avatar">{user?.name?.[0]?.toUpperCase()||'U'}</div><div className="user-mini"><b>{user?.name||'User'}</b><span>{user?.role||'viewer'}</span></div><button className="icon-button" title="Sign out" onClick={async()=>{await logout();nav('/login')}}><LogOut size={18}/></button></div>
  </aside>
  <main className="main-area"><header className="topbar"><div className="search-box"><Search size={17}/><input aria-label="Search" placeholder="Search tournaments, teams, matches..." onKeyDown={e=>{if(e.key==='Enter')nav('/matches')}}/></div><div className="top-actions"><button className="notification-button" aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-user"><div className="top-avatar">{user?.name?.[0]?.toUpperCase()||'U'}</div><div><b>{user?.name||'User'}</b><span>{user?.role||'viewer'}</span></div><ChevronDown size={15}/></div></div></header><div className="page-wrap"><Outlet/></div></main>
 </div>
}
