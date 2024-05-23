import React from "react";

interface LinkType {
  title: string;
  path: string;
}

export interface ParentLinkType extends LinkType {
  icon: JSX.Element;
}

class BaseUserPaths {
  path: ParentLinkType[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
  ];

  get getPaths() {
    return this.path;
  }

}

class Admission extends BaseUserPaths {
  prvPath: ParentLinkType[] = [
    {
      title: "Admission",
      path: "/admission/new",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
    {
      title: "Students",
      path: "/admission/all",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
  ];
  constructor() {
    super();
    this.path.push(...this.prvPath)
  }

  get getPaths() {
    return this.path;
  }

  get getPrvPath() {
    return this.prvPath;
  }
}

class Management extends BaseUserPaths {
  prvPath: ParentLinkType[] = [
    {
      title: "Time Table (category)",
      path: "/management/time_table",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
    {
      title: "Classes",
      path: "/management/classes",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
    {
      title: "Employee",
      path: "/management/Employee",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
    {
      title: "Employee New",
      path: "/management/employee/new",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
    {
      title: "Attendance",
      path: "/management/attendance",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
  ];

  constructor() {
    super();
    this.path.push(...this.prvPath)
  }

  get getPaths() {
    return this.path;
  }

  get getPrvPath() {
    return this.prvPath;
  }
}

class Teacher extends BaseUserPaths {
  prvPath: ParentLinkType[] = [
    {
      title: "Time Table (personal)",
      path: "/teacher/time_table",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
    {
      title: "Classes",
      path: "/teacher/classes",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
  ];

  constructor() {
    super();
    this.path.push(...this.prvPath)
  }

  get getPaths() {
    return this.path;
  }

  get getPrvPath() {
    return this.prvPath;
  }
}

class Student extends BaseUserPaths {
  prvPath: ParentLinkType[] = [
    {
      title: "Time Table (personal)",
      path: "/student/time_table",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
    {
      title: "Attendance (personal)",
      path: "/student/attendance",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
    {
      title: "Payments",
      path: "/student/transactions",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
    {
      title: "Details",
      path: "/student/details",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
  ];

  constructor() {
    super();
    this.path.push(...this.prvPath)
  }

  get getPaths() {
    return this.path;
  }

  get getPrvPath() {
    return this.prvPath;
  }
}

class Accounts extends BaseUserPaths {
  prvPath: ParentLinkType[] = [
    {
      title: "Transactions",
      path: "/accounts/transactions",
      icon: <i className="fi fi-rr-chart-pie-alt"></i>,
    },
    {
      title: "Dues",
      path: "/accounts/dues",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
    {
      title: "Debits",
      path: "/accounts/debits",
      icon: <i className="fi fi-rs-pen-circle"></i>,
    },
  ];

  constructor() {
    super();
    this.path.push(...this.prvPath)
  }

  get getPaths() {
    return this.path;
  }

  get getPrvPath() {
    return this.prvPath;
  }
}

class AdminPaths extends BaseUserPaths {
  prvPath: ParentLinkType[] = [];

  constructor() {
    super();
    const admissionPaths = new Admission().getPrvPath;
    const managementPaths = new Management().getPrvPath;
    const accountsPaths = new Accounts().getPrvPath;
    const studentsPaths = new Student().getPrvPath;
    const teacherPaths = new Teacher().getPrvPath;

    const allPaths = [
      ...admissionPaths,
      ...managementPaths,
      // ...accountsPaths,
      // ...studentsPaths,
      // ...teacherPaths
    ];

    const setOfPaths: Set<ParentLinkType> = new Set(allPaths);
    this.path.push(...new Array(...setOfPaths));
  }

  get getPaths() {
    return this.path;
  }
}

export interface RolesTypes {
  roles: "ADMIN" | "TEACHER" | "STUDENT" | "ACCOUNTS" | "MANAGEMENT" | "ADMISSION";
}

const Roles: Record<RolesTypes["roles"], ParentLinkType[]> = {
  ADMIN: new AdminPaths().getPaths,
  TEACHER: new AdminPaths().getPaths,
  STUDENT: new Student().getPaths,
  ACCOUNTS: new AdminPaths().getPaths,
  MANAGEMENT: new Management().getPaths,
  ADMISSION: new Admission().getPaths,
};

const GetUserLinkByLevel = (role: RolesTypes["roles"]) => {
  return Roles[role];
};

export default Roles;
export { GetUserLinkByLevel };
