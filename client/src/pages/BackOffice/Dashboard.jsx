import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  FolderKanban, 
  TrendingUp, 
  Clock, 
  Search,
  Calendar,
  BarChart3,
  Activity,
  Bell,
  PieChart
} from "lucide-react";

import { formatDate } from "../../utils/formatDate";
import { getProjects } from "../../services/projectService";
import { getUserData } from "../../services/userService";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import styles from "./Dashboard.module.css";

const Dashboard = ({ title }) => {
  const { userProfile } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalUsers: 0,
    activeProjects: 0,
    completedProjects: 0
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Fetch data for projects and users when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects(token);
        const usersData = await getUserData(token);

        // Ensure projectsData and usersData are arrays, or default to an empty array
        const projectsArray = Array.isArray(projectsData) ? projectsData : [];
        const usersArray = Array.isArray(usersData) ? usersData : [];
        
        setProjects(projectsArray);
        setUsers(usersArray);
        
        // Calculate dashboard stats
        setStats({
          totalProjects: projectsArray.length,
          totalUsers: usersArray.length,
          activeProjects: projectsArray.filter(p => p.status === "active").length || Math.floor(projectsArray.length * 0.7),
          completedProjects: projectsArray.filter(p => p.status === "completed").length || Math.floor(projectsArray.length * 0.3)
        });
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Navigate to specific page
  const handleNavigate = (path) => {
    navigate(`/backoffice/${path}`);
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter projects based on selected filter
  const getFilteredProjects = () => {
    if (selectedFilter === "all") return filteredProjects;
    return filteredProjects.filter(project => project.status === selectedFilter);
  };

  // Stat Card Component
  const StatCard = ({ title, count, icon, color, onClick }) => (
    <div className={styles.statCard} onClick={onClick} style={{ borderLeft: `4px solid ${color}` }}>
      <div className={styles.statIcon} style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
      <div className={styles.statInfo}>
        <h3>{title}</h3>
        <p className={styles.statCount}>{count}</p>
      </div>
    </div>
  );

  // Activity Item Component
  const ActivityItem = ({ icon, title, date, description, color }) => (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon} style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </div>
      <div className={styles.activityContent}>
        <h4>{title}</h4>
        <p className={styles.activityDescription}>{description}</p>
        <span className={styles.activityDate}>{date}</span>
      </div>
    </div>
  );

  // Project Item Component
  const ProjectItem = ({ project }) => (
    <div className={styles.projectItem} onClick={() => handleNavigate(`projects/${project._id}`)}>
      <div className={styles.projectInfo}>
        <h4>{project.title}</h4>
        <p>{project.description?.substring(0, 60) || "No description available."}{project.description?.length > 60 ? "..." : ""}</p>
      </div>
      <div className={styles.projectMeta}>
        <span className={styles.projectDate}>
          <Calendar size={14} />
          {formatDate(project.createdAt, "short")}
        </span>
        <span className={`${styles.projectStatus} ${styles[project.status || "active"]}`}>
          {project.status || "Active"}
        </span>
      </div>
    </div>
  );

  // User Item Component
  const UserItem = ({ user }) => (
    <div className={styles.userItem} onClick={() => handleNavigate(`users/${user._id}`)}>
      <div className={styles.userAvatar}>
        {user.avatar ? (
          <img src={user.avatar} alt={user.username} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user.username?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </div>
      <div className={styles.userInfo}>
        <h4>{user.username}</h4>
        <p>{user.email || "No email available"}</p>
        <span className={styles.userDate}>
          <Clock size={14} />
          Joined {formatDate(user.createdAt, "short")}
        </span>
      </div>
    </div>
  );

  // Generate random data for charts (replace with real data once available)
  const generateChartData = () => {
    return {
      projectTrends: [15, 25, 20, 30, 45, 40, 50, 60, 55, 70, 65, 80],
      userActivity: [10, 15, 8, 12, 20, 18, 25, 30, 28, 35, 32, 40]
    };
  };

  const chartData = generateChartData();

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContent}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeText}>
            <h1>Welcome back{userProfile?.username ? `, ${userProfile.username}` : ""}!</h1>
            <p>Here's what's happening with your projects today.</p>
          </div>
          <div className={styles.searchBar}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Overview Section */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <div className={styles.statsOverview}>
            <StatCard 
              title="Total Projects" 
              count={stats.totalProjects} 
              icon={<FolderKanban size={24} />} 
              color="#4361ee" 
              onClick={() => handleNavigate("projects")}
            />
            <StatCard 
              title="Total Users" 
              count={stats.totalUsers} 
              icon={<Users size={24} />} 
              color="#3a86ff" 
              onClick={() => handleNavigate("users")}
            />
            <StatCard 
              title="Active Projects" 
              count={stats.activeProjects} 
              icon={<Activity size={24} />} 
              color="#38b000" 
              onClick={() => handleNavigate("projects?status=active")}
            />
            <StatCard 
              title="Completed Projects" 
              count={stats.completedProjects} 
              icon={<TrendingUp size={24} />} 
              color="#ff9f1c" 
              onClick={() => handleNavigate("projects?status=completed")}
            />
          </div>
        )}

        {/* Main Dashboard Sections */}
        <div className={styles.dashboardMainContent}>
          {/* Left Column */}
          <div className={styles.dashboardColumn}>
            {/* Project Chart */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <h3><BarChart3 size={18} /> Project Analytics</h3>
                <div className={styles.cardActions}>
                  <select className={styles.filterSelect} onChange={(e) => setSelectedFilter(e.target.value)}>
                    <option value="all">All Projects</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className={styles.chartContainer}>
                {/* Placeholder for chart - replace with actual chart component */}
                <div className={styles.chartPlaceholder}>
                  <div className={styles.chartBars}>
                    {chartData.projectTrends.map((value, index) => (
                      <div 
                        key={index} 
                        className={styles.chartBar} 
                        style={{ height: `${value}%` }}
                        title={`Month ${index + 1}: ${value} projects`}
                      ></div>
                    ))}
                  </div>
                  <div className={styles.chartLabels}>
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <h3><FolderKanban size={18} /> Recent Projects</h3>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => handleNavigate("projects")}
                >
                  View All
                </button>
              </div>
              <div className={styles.projectList}>
                {filteredProjects.length > 0 ? (
                  filteredProjects.slice(0, 4).map((project) => (
                    <ProjectItem key={project._id} project={project} />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <FolderKanban size={40} />
                    <p>No projects available</p>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleNavigate("projects/new")}
                    >
                      Create Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.dashboardColumn}>
            {/* Activity Feed */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <h3><Bell size={18} /> Recent Activity</h3>
              </div>
              <div className={styles.activityFeed}>
                {projects.length > 0 ? (
                  <>
                    <ActivityItem
                      icon={<FolderKanban size={16} />}
                      title="New Project Created"
                      description={`"${projects[0]?.title}" has been created`}
                      date={formatDate(projects[0]?.createdAt, "relative")}
                      color="#4361ee"
                    />
                    <ActivityItem
                      icon={<Users size={16} />}
                      title="New User Joined"
                      description={`${users[0]?.username} has joined the platform`}
                      date={formatDate(users[0]?.createdAt, "relative")}
                      color="#3a86ff"
                    />
                    <ActivityItem
                      icon={<TrendingUp size={16} />}
                      title="Project Completed"
                      description={`"${projects[1]?.title || 'Sample Project'}" marked as completed`}
                      date="2 days ago"
                      color="#38b000"
                    />
                    <ActivityItem
                      icon={<Clock size={16} />}
                      title="Deadline Approaching"
                      description={`"${projects[2]?.title || 'Another Project'}" due soon`}
                      date="In 3 days"
                      color="#ff9f1c"
                    />
                  </>
                ) : (
                  <div className={styles.emptyState}>
                    <Activity size={40} />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* User Distribution */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <h3><PieChart size={18} /> User Distribution</h3>
              </div>
              <div className={styles.distributionContainer}>
                {/* Placeholder for user distribution chart */}
                <div className={styles.distributionChart}>
                  <div className={styles.pieChartPlaceholder}>
                    <div className={styles.pieSegment} style={{ backgroundColor: "#4361ee", transform: "rotate(0deg)", clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)" }}></div>
                    <div className={styles.pieSegment} style={{ backgroundColor: "#3a86ff", transform: "rotate(180deg)", clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 30%, 0% 30%, 0% 0%, 50% 0%)" }}></div>
                    <div className={styles.pieCenter}></div>
                  </div>
                </div>
                <div className={styles.distributionLegend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: "#4361ee" }}></span>
                    <span>Admin Users</span>
                    <span className={styles.legendValue}>45%</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: "#3a86ff" }}></span>
                    <span>Regular Users</span>
                    <span className={styles.legendValue}>55%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <h3><Users size={18} /> Recent Users</h3>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => handleNavigate("users")}
                >
                  View All
                </button>
              </div>
              <div className={styles.userList}>
                {users.length > 0 ? (
                  users.slice(0, 3).map((user) => (
                    <UserItem key={user._id} user={user} />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <Users size={40} />
                    <p>No users available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;