const arrF = require('./arr');
const filterBy = arrF.filterBy;

describe('filterBy Function Testing', () =>
{
	describe('bad arguments', () =>
	{
		var args = 
		[
			undefined,
			null,
			true,
			false,
			4,
			3.7,
			-2,
			0,
			'',
			'a string',
			[],
			[true, 2, 'three'],
			{},
			{p1:true,p2:2,p3:'three'}
		];

		var errs = {};

		test('no arguments', () =>
		{
			expect(filterBy()).toEqual( [] );
		});

		test('one argument', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				if (i === 11)
					result = [true, 2, 'three'];
				else
					result = [];

				try { expect(filterBy( args[i] )).toEqual(result); }
				catch(err)
				{
					var newKey = String(args[i]);
					newKey = newKey.replace(/\s+/g, '');
					errs[newKey] = String(err);
				}
			}
		});

		test('Two arguments', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				for (let j = 0; j < args.length; j++)
				{
					if ( i === 11)
						result = [true, 2, 'three'];
					else
						result = [];

					try { expect(filterBy(args[i], args[j] )).toEqual(result); }
					catch(err)
					{
						var newKey = String(args[i]) + "_" + String(args[j]);
						newKey = newKey.replace(/\s+/g, '');
						errs[newKey] = String(err);
					}
				}
			}
		});
		
		describe('three arguments', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				for (let j = 0; j < args.length; j++)
				{
					for (let k = 0; k < args.length; k++)
					{
						if (i === 11 && k === 0 && (j === 4 || j === 7))
							result = [true, 2];
						else if (i === 11 && k === 0)
							result = [true, 2, 'three'];
						else
							result = [];

						try { expect(filterBy(args[i], args[j], args[k] )).toEqual(result); }
						catch(err)
						{
							var newKey = String(args[i]) + '_' + String(args[j]) + '_' + String(args[k]);
							newKey = newKey.replace(/\s+/g, '');
							errs[newKey] = String(err);
						}
					}
				}
			}
		});

// Uncomment the following lines to look at the produced Errors.
// The bottom line has the highest information provided to lines printed ratio.
		// console.log(errs);
		// console.log(Object.keys(errs));
		// new Set(Object.values(errs)).forEach(x => console.log(x));
	});

	test('Good arguments - array of objects', () =>
	{
// Undefined is default property name and value arguement.
	function chair(material,numLegs,comfy)
		{
			this.material = material;
			this.legs = numLegs;
			this.comfy = comfy;
		}

		var chair1 = new chair('wood', 4, true);
		var chair2 = new chair('plastic', 3, false);
		var chair3 = new chair('metal', 'four', 'no');
		var chair4 = new chair('fabric', 'none', 1);
		var chair5 = new chair('plastic', 4, false);

		var chairs = [chair1, chair2, chair3, chair4, chair5];

		expect(filterBy(chairs)).toEqual(chairs);

		expect(filterBy(chairs, 'unusedPropName')).toEqual(chairs);

		expect(filterBy(chairs, 'unusedPropName', 'any value')).toEqual( [] );

		expect(filterBy(chairs, 'material', 'unused value')).toEqual( [] );

		expect(filterBy(chairs, 'material', 'plastic')).toEqual( [chair2, chair5] );
	});
});