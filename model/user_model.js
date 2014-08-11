// Don't load this file if a user model already exists
if (alchemy.classes.UserModel) {
	return;
}

/**
 * The User Model class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@codedor.be>
 * @since    0.0.1
 * @version  0.0.1
 */
Model.extend(function UserModel() {

	/**
	 * The preInit constructor
	 *
	 * @author   Jelle De Loecker   <jelle@codedor.be>
	 * @since    0.0.1
	 * @version  0.0.1
	 */
	this.preInit = function preInit() {

		this.parent();

		this.displayField = 'username';
		
		this.hasOneChild = {
			NotificationSetting: {
				modelName: 'NotificationSetting',
				foreignKey: 'user_id'
			}
		};

		this.hasAndBelongsToMany = {
			AclGroup: {
				modelName: 'AclGroup',
				foreignKey: 'acl_group_id'
			}
		};
		
		this.blueprint = {
			username: {
				type: 'String',
				index: {
					unique: true,
					name: 'username',
					sparse: false,
					order: 'asc'
				}
			},
			name: {
				type: 'String',
				rules: {
					notempty: {message: 'This field should not be empty!'}
				}
			},
			password: {
				type: 'Password',
				rules: {
					notempty: {
						mesage: 'A password is required!'
					}
				}
			}
		};

		this.modelEdit = {
			general: {
				title: __('chimera', 'General'),
				fields: [
					'username',
					'name',
					'password',
					'acl_group_id'
				]
			}
		};

		this.modelIndex = {
			fields: [
				'created',
				'username',
				'name',
				'acl_group_id'
			]
		};

		this.actionLists = {
			paginate: ['index', 'add'],
			list: ['export'],
			record: [
				'view',
				'edit',
				'remove'
			]
		};
	};
});