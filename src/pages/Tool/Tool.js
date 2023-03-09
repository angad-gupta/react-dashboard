import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Tool.module.css';
import CheckList from './components/CheckList/CheckList.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import ChooseTools from './ChooseTools';

function Tool() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  return(
    <div className={styles.Tool}>
      <ChooseTools />
    </div>
  );
}

Tool.propTypes = {};

Tool.defaultProps = {};

export default Tool;
