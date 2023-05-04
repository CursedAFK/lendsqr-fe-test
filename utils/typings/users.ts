export interface Users {
	createdAt: Date
	orgName: string
	userName: string
	email: string
	phoneNumber: string
	lastActiveDate: Date
	profile: Profile
	guarantor: Guarantor
	accountBalance: string
	accountNumber: string
	socials: Socials
	education: Education
	id: string
	status: string
}

export interface Education {
	level: Level
	employmentStatus: EmploymentStatus
	sector: Sector
	duration: Duration
	officeEmail: string
	monthlyIncome: string[]
	loanRepayment: string
}

export enum Duration {
	The2Years = '2 Years'
}

export enum EmploymentStatus {
	Employed = 'Employed'
}

export enum Level {
	Bsc = 'Bsc'
}

export enum Sector {
	FinTech = 'FinTech'
}

export interface Guarantor {
	firstName: string
	lastName: string
	phoneNumber: string
	gender: Gender
	address: string
}

export enum Gender {
	Male = 'Male'
}

export interface Profile {
	firstName: string
	lastName: string
	phoneNumber: string
	avatar: string
	gender: Gender
	bvn: string
	address: string
	currency: Currency
}

export enum Currency {
	Ngn = 'NGN'
}

export interface Socials {
	facebook: Facebook
	instagram: Facebook
	twitter: Facebook
}

export enum Facebook {
	Lendsqr = '@lendsqr'
}
