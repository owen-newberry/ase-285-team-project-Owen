import React, { useState } from 'react';
import MenuCard from './MenuCard';
import '../../css/MenuDashboard.css';
import deleteIcon from '../../icons/delete.png';

function MenuDashboard() {
	const [menus, setMenus] = useState([
		{
			title: 'Master Menu',
			description: 'This menu will be shown to customers',
		},
	]);
	const [showConfirm, setShowConfirm] = useState(false);
	const [menuToDelete, setMenuToDelete] = useState(null);

	const handleAddMenu = () => {
		const newMenu = {
			title: 'Untitled Menu',
			description: 'New menu created',
		};
		setMenus([...menus, newMenu]);
	};

	const handleRequestDelete = (index) => {
		setMenuToDelete(index);
		setShowConfirm(true);
	};

	const handleConfirmDelete = () => {
		setMenus(menus.filter((_, i) => i !== menuToDelete));
		setMenuToDelete(null);
		setShowConfirm(false);
	};

	const handleCancelDelete = () => {
		setShowConfirm(false);
		setMenuToDelete(null);
	};

	return (
		<div className='dashboard-container'>
			<div className='dashboard-header'>
				<button
					className='button add-menu-btn'
					onClick={handleAddMenu}
				>
					+ Add a Menu
				</button>
				<h2 className='dashboard-title'>
					Your Menu Dashboard
				</h2>
			</div>

			<div className='menu-grid'>
				{menus.map((menu, index) => (
					<div
						className='menu-card-wrapper'
						key={index}
					>
						{index !== 0 && (
							<img
								src={deleteIcon}
								alt='Delete'
								className='delete-icon'
								onClick={() => handleRequestDelete(index)}
							/>
						)}
						<MenuCard
							title={menu.title}
							description={menu.description}
							buttonLabel='View Menu'
						/>
					</div>
				))}
			</div>

			{/* Confirmation Box */}
			{showConfirm && (
				<div className='confirm-delete-box'>
					<div className='confirm-content'>
						<p className='confirm-title'>
							Confirm Deletion?
						</p>
						<p className='confirm-message'>
							You are deleting{' '}
							<strong>{menus[menuToDelete]?.title}</strong>.
						</p>
					</div>
					<div className='delete-buttons-box'>
						<button
							className='delete-cancel'
							onClick={handleCancelDelete}
						>
							No, do not Delete
						</button>
						<button
							className='delete-confirm'
							onClick={handleConfirmDelete}
						>
							Yes, Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default MenuDashboard;
