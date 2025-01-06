const superAdminPageStyles = {
  drawer: {
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: '#1e293b',
      color: '#f1f5f9',
    },
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '80%',
    maxHeight: '60px',
    objectFit: 'contain' as const,
  },
  title: {
    marginTop: '10px',
  },
  icon: {
    color: '#f1f5f9',
  },
  mainContent: {
    flexGrow: 1,
    backgroundColor: '#eee',
    padding: 24,
    minHeight: '100vh',
  },
};

export default superAdminPageStyles;
