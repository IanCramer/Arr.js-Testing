const arrF = require('./arr');
const findBy = arrF.findBy;

describe('findBy Function Testing', () =>
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
			expect(findBy()).toBe(undefined);
		});

		test('one argument', () =>
		{
			var result;
			for(let i = 0; i < args.length; i++)
			{
				if (i === 11)
					result = true;
				else
					result = undefined;

				try { expect(findBy( args[i] )).toBe(result); }
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
						result = true;
					else
						result = undefined;

					try { expect(findBy(args[i], args[j] )).toBe(result); }
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
						if (i === 11 && k === 0)
							result = true;
						else
							result = undefined;

						try { expect(findBy(args[i], args[j], args[k] )).toBe(result); }
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

	test('array of objects (as function intended)', () =>
	{
		var obj1 = {p1: true, p2: 2, p3: 'three'};
		var obj2 = {k1: false, k2: 'two', k3: 3};
		var obj3 = {v1: 1, v2: true, v3: 'three'};
		var arr = [obj1, obj2, obj3];

		expect(findBy(arr, 'k2', 'two')).toBe(obj2);

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

		var chairs = [chair1, chair2, chair3,chair4];

		// Find the first comfy chair?
		expect(findBy(chairs, 'comfy', true)).toBe(chair1);
	});
});