import { Dataset, SmartRecommendation, SmartAlert } from '../types';
import { AIEngine } from './aiEngine';
import { DatabaseService } from './database';

// Business Intelligence Service - Acts like a senior business analyst
export class BusinessIntelligenceService {
  private static instance: BusinessIntelligenceService;
  private aiEngine: AIEngine;
  private db: DatabaseService;

  private constructor() {
    this.aiEngine = AIEngine.getInstance();
    this.db = DatabaseService.getInstance();
  }

  static getInstance(): BusinessIntelligenceService {
    if (!BusinessIntelligenceService.instance) {
      BusinessIntelligenceService.instance = new BusinessIntelligenceService();
    }
    return BusinessIntelligenceService.instance;
  }

  /**
   * Generate comprehensive business recommendations
   */
  async generateBusinessRecommendations(dataset: Dataset): Promise<SmartRecommendation[]> {
    const analysis = await this.aiEngine.performBusinessAnalysis(dataset);
    const recommendations: SmartRecommendation[] = [];

    // Strategic growth recommendations
    const growthRecs = this.generateGrowthRecommendations(analysis);
    recommendations.push(...growthRecs);

    // Customer experience recommendations
    const customerRecs = this.generateCustomerRecommendations(analysis);
    recommendations.push(...customerRecs);

    // Operational efficiency recommendations
    const operationalRecs = this.generateOperationalRecommendations(analysis);
    recommendations.push(...operationalRecs);

    // Market opportunity recommendations
    const marketRecs = this.generateMarketRecommendations(analysis);
    recommendations.push(...marketRecs);

    // Risk mitigation recommendations
    const riskRecs = this.generateRiskRecommendations(analysis);
    recommendations.push(...riskRecs);

    return recommendations
      .sort((a, b) => this.getImpactScore(b.impact) - this.getImpactScore(a.impact))
      .slice(0, 10);
  }

  private generateGrowthRecommendations(analysis: any): SmartRecommendation[] {
    const recommendations = [];
    const { kpis } = analysis;

    // Revenue growth strategies
    if (kpis.sales_growth_pct < 15) {
      recommendations.push({
        id: `growth-${Date.now()}`,
        type: 'optimization',
        title: 'Accelerate Revenue Growth',
        description: `Current growth rate of ${kpis.sales_growth_pct.toFixed(1)}% is below industry benchmarks. Implement targeted marketing campaigns, expand product lines, and optimize pricing strategies to achieve 20-30% growth.`,
        impact: 'high',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'growth',
        priority: 1,
        estimatedImpact: '$50,000 - $200,000 additional revenue',
        timeframe: '3-6 months',
        resources: ['Marketing team', 'Product development', 'Sales analytics']
      });
    }

    // Market expansion opportunities
    if (kpis.unique_customers < 1000) {
      recommendations.push({
        id: `expansion-${Date.now()}`,
        type: 'opportunity',
        title: 'Scale Customer Acquisition',
        description: `With ${kpis.unique_customers} customers, there's significant room for growth. Implement multi-channel acquisition strategies including SEO, paid advertising, and referral programs.`,
        impact: 'high',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'growth',
        priority: 2,
        estimatedImpact: '200-500% customer base increase',
        timeframe: '6-12 months',
        resources: ['Digital marketing', 'Content creation', 'Analytics tools']
      });
    }

    return recommendations;
  }

  private generateCustomerRecommendations(analysis: any): SmartRecommendation[] {
    const recommendations = [];
    const { kpis } = analysis;

    // Customer retention optimization
    if (kpis.repeat_customer_rate_pct < 30) {
      recommendations.push({
        id: `retention-${Date.now()}`,
        type: 'optimization',
        title: 'Implement Customer Retention Program',
        description: `${kpis.repeat_customer_rate_pct.toFixed(1)}% repeat rate is below optimal. Deploy email marketing automation, loyalty rewards, and personalized product recommendations to increase retention by 40-60%.`,
        impact: 'high',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'customer',
        priority: 1,
        estimatedImpact: '15-25% revenue increase from existing customers',
        timeframe: '2-4 months',
        resources: ['CRM system', 'Email marketing platform', 'Customer success team']
      });
    }

    // Customer lifetime value optimization
    if (kpis.customer_lifetime_value < 200) {
      recommendations.push({
        id: `clv-${Date.now()}`,
        type: 'optimization',
        title: 'Increase Customer Lifetime Value',
        description: `Current CLV of $${kpis.customer_lifetime_value?.toFixed(2) || '150'} can be improved through upselling, cross-selling, and subscription models. Target 50% CLV increase.`,
        impact: 'medium',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'customer',
        priority: 2,
        estimatedImpact: '$75-150 additional revenue per customer',
        timeframe: '4-8 months',
        resources: ['Product bundling', 'Recommendation engine', 'Customer analytics']
      });
    }

    return recommendations;
  }

  private generateOperationalRecommendations(analysis: any): SmartRecommendation[] {
    const recommendations = [];
    const { kpis } = analysis;

    // Order value optimization
    if (kpis.average_order_value < 100) {
      recommendations.push({
        id: `aov-${Date.now()}`,
        type: 'optimization',
        title: 'Optimize Average Order Value',
        description: `Current AOV of $${kpis.average_order_value.toFixed(2)} can be increased through product bundling, volume discounts, and free shipping thresholds. Target 25-40% AOV increase.`,
        impact: 'medium',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'operations',
        priority: 1,
        estimatedImpact: '$25-40 additional revenue per order',
        timeframe: '1-3 months',
        resources: ['E-commerce platform', 'Pricing strategy', 'Product catalog']
      });
    }

    // Inventory optimization
    if (kpis.top_products_by_sales.length > 0) {
      const topProduct = kpis.top_products_by_sales[0];
      recommendations.push({
        id: `inventory-${Date.now()}`,
        type: 'optimization',
        title: 'Optimize Product Portfolio',
        description: `"${topProduct.product}" generates $${topProduct.sales.toLocaleString()} (top performer). Expand inventory of high-performing products and consider discontinuing low performers.`,
        impact: 'medium',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'operations',
        priority: 2,
        estimatedImpact: '10-20% improvement in profit margins',
        timeframe: '2-6 months',
        resources: ['Inventory management', 'Supplier relationships', 'Demand forecasting']
      });
    }

    return recommendations;
  }

  private generateMarketRecommendations(analysis: any): SmartRecommendation[] {
    const recommendations = [];
    const { timeseries, kpis } = analysis;

    // Seasonal opportunity
    if (timeseries.seasonality?.hasSeasonality) {
      recommendations.push({
        id: `seasonal-${Date.now()}`,
        type: 'opportunity',
        title: 'Leverage Seasonal Patterns',
        description: `Seasonal patterns detected in sales data. Prepare inventory and marketing campaigns for peak seasons to maximize revenue opportunities.`,
        impact: 'medium',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'market',
        priority: 1,
        estimatedImpact: '15-30% revenue boost during peak seasons',
        timeframe: 'Seasonal planning',
        resources: ['Demand forecasting', 'Marketing calendar', 'Inventory planning']
      });
    }

    // Market positioning
    if (kpis.average_order_value > 150) {
      recommendations.push({
        id: `premium-${Date.now()}`,
        type: 'opportunity',
        title: 'Strengthen Premium Positioning',
        description: `High AOV of $${kpis.average_order_value.toFixed(2)} indicates premium market position. Enhance brand messaging and introduce luxury product lines.`,
        impact: 'medium',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'market',
        priority: 2,
        estimatedImpact: '20-40% margin improvement',
        timeframe: '6-12 months',
        resources: ['Brand strategy', 'Premium product development', 'Marketing positioning']
      });
    }

    return recommendations;
  }

  private generateRiskRecommendations(analysis: any): SmartRecommendation[] {
    const recommendations = [];
    const { anomalies, kpis } = analysis;

    // Revenue concentration risk
    if (kpis.top_products_by_sales.length > 0) {
      const topProduct = kpis.top_products_by_sales[0];
      const concentration = (topProduct.sales / kpis.total_sales) * 100;
      
      if (concentration > 40) {
        recommendations.push({
          id: `risk-concentration-${Date.now()}`,
          type: 'alert',
          title: 'Mitigate Revenue Concentration Risk',
          description: `"${topProduct.product}" represents ${concentration.toFixed(1)}% of total sales. Diversify product portfolio to reduce dependency on single products.`,
          impact: 'medium',
          actionable: true,
          createdAt: new Date().toISOString(),
          category: 'risk',
          priority: 1,
          estimatedImpact: 'Reduced business risk and stable revenue',
          timeframe: '6-12 months',
          resources: ['Product development', 'Market research', 'Portfolio analysis']
        });
      }
    }

    // Anomaly-based risks
    if (anomalies.length > 3) {
      recommendations.push({
        id: `risk-anomalies-${Date.now()}`,
        type: 'alert',
        title: 'Investigate Market Volatility',
        description: `${anomalies.length} unusual patterns detected in recent data. Monitor market conditions and competitor activities to identify potential threats.`,
        impact: 'medium',
        actionable: true,
        createdAt: new Date().toISOString(),
        category: 'risk',
        priority: 2,
        estimatedImpact: 'Early risk detection and mitigation',
        timeframe: 'Immediate',
        resources: ['Market intelligence', 'Competitive analysis', 'Risk assessment']
      });
    }

    return recommendations;
  }

  /**
   * Generate smart business alerts
   */
  async generateSmartAlerts(dataset: Dataset): Promise<SmartAlert[]> {
    const analysis = await this.aiEngine.performBusinessAnalysis(dataset);
    const alerts: SmartAlert[] = [];

    // Performance alerts
    const performanceAlerts = this.generatePerformanceAlerts(analysis, dataset.id);
    alerts.push(...performanceAlerts);

    // Trend alerts
    const trendAlerts = this.generateTrendAlerts(analysis, dataset.id);
    alerts.push(...trendAlerts);

    // Anomaly alerts
    const anomalyAlerts = this.generateAnomalyAlerts(analysis, dataset.id);
    alerts.push(...anomalyAlerts);

    // Opportunity alerts
    const opportunityAlerts = this.generateOpportunityAlerts(analysis, dataset.id);
    alerts.push(...opportunityAlerts);

    return alerts.slice(0, 15); // Limit to most important alerts
  }

  private generatePerformanceAlerts(analysis: any, datasetId: string): SmartAlert[] {
    const alerts = [];
    const { kpis } = analysis;

    // Critical performance decline
    if (kpis.sales_growth_pct < -15) {
      alerts.push({
        id: `perf-critical-${Date.now()}`,
        type: 'critical',
        title: 'Critical Revenue Decline',
        message: `Revenue has dropped by ${Math.abs(kpis.sales_growth_pct).toFixed(1)}%. Immediate action required to prevent further losses.`,
        datasetId,
        isRead: false,
        createdAt: new Date().toISOString(),
        actionRequired: true,
        metric: 'sales_growth',
        threshold: -15,
        currentValue: kpis.sales_growth_pct,
        severity: 'critical',
        category: 'performance'
      });
    }

    // Low customer retention warning
    if (kpis.repeat_customer_rate_pct < 15) {
      alerts.push({
        id: `perf-retention-${Date.now()}`,
        type: 'warning',
        title: 'Low Customer Retention Rate',
        message: `Only ${kpis.repeat_customer_rate_pct.toFixed(1)}% of customers are returning. Implement retention strategies immediately.`,
        datasetId,
        isRead: false,
        createdAt: new Date().toISOString(),
        actionRequired: true,
        metric: 'repeat_customer_rate',
        threshold: 15,
        currentValue: kpis.repeat_customer_rate_pct,
        severity: 'high',
        category: 'performance'
      });
    }

    return alerts;
  }

  private generateTrendAlerts(analysis: any, datasetId: string): SmartAlert[] {
    const alerts = [];
    const { timeseries, kpis } = analysis;

    // Positive momentum alert
    if (kpis.momentum_score > 0.2) {
      alerts.push({
        id: `trend-positive-${Date.now()}`,
        type: 'success',
        title: 'Strong Growth Momentum',
        message: `Business momentum is accelerating. Consider scaling marketing efforts to capitalize on this trend.`,
        datasetId,
        isRead: false,
        createdAt: new Date().toISOString(),
        actionRequired: false,
        metric: 'momentum_score',
        currentValue: kpis.momentum_score,
        severity: 'info',
        category: 'trend'
      });
    }

    // Trend reversal warning
    if (timeseries.trend === 'downward' && kpis.sales_growth_pct > 0) {
      alerts.push({
        id: `trend-reversal-${Date.now()}`,
        type: 'warning',
        title: 'Trend Reversal Detected',
        message: `Recent data shows downward trend despite positive overall growth. Monitor closely for potential issues.`,
        datasetId,
        isRead: false,
        createdAt: new Date().toISOString(),
        actionRequired: true,
        metric: 'trend_direction',
        currentValue: timeseries.trend,
        severity: 'medium',
        category: 'trend'
      });
    }

    return alerts;
  }

  private generateAnomalyAlerts(analysis: any, datasetId: string): SmartAlert[] {
    const alerts = [];
    const { anomalies } = analysis;

    anomalies.forEach((anomaly, index) => {
      if (index < 3) { // Limit to top 3 anomalies
        alerts.push({
          id: `anomaly-${Date.now()}-${index}`,
          type: anomaly.severity === 'high' ? 'critical' : 'warning',
          title: 'Data Anomaly Detected',
          message: `${anomaly.context}: ${anomaly.why}`,
          datasetId,
          isRead: false,
          createdAt: new Date().toISOString(),
          actionRequired: anomaly.severity === 'high',
          metric: anomaly.metric,
          currentValue: anomaly.value,
          severity: anomaly.severity,
          category: 'anomaly'
        });
      }
    });

    return alerts;
  }

  private generateOpportunityAlerts(analysis: any, datasetId: string): SmartAlert[] {
    const alerts = [];
    const { kpis } = analysis;

    // High-value customer opportunity
    if (kpis.customer_lifetime_value > 300) {
      alerts.push({
        id: `opp-clv-${Date.now()}`,
        type: 'info',
        title: 'High-Value Customer Opportunity',
        message: `Customer lifetime value of $${kpis.customer_lifetime_value?.toFixed(2)} indicates premium customer base. Consider VIP programs.`,
        datasetId,
        isRead: false,
        createdAt: new Date().toISOString(),
        actionRequired: false,
        metric: 'customer_lifetime_value',
        currentValue: kpis.customer_lifetime_value,
        severity: 'info',
        category: 'opportunity'
      });
    }

    // Product performance opportunity
    if (kpis.top_products_by_sales.length > 0) {
      const topProduct = kpis.top_products_by_sales[0];
      const secondProduct = kpis.top_products_by_sales[1];
      
      if (secondProduct && topProduct.sales > secondProduct.sales * 2) {
        alerts.push({
          id: `opp-product-${Date.now()}`,
          type: 'info',
          title: 'Star Product Opportunity',
          message: `"${topProduct.product}" significantly outperforms other products. Consider expanding this product line.`,
          datasetId,
          isRead: false,
          createdAt: new Date().toISOString(),
          actionRequired: false,
          metric: 'product_performance',
          currentValue: topProduct.sales,
          severity: 'info',
          category: 'opportunity'
        });
      }
    }

    return alerts;
  }

  /**
   * Generate executive summary report
   */
  async generateExecutiveSummary(dataset: Dataset): Promise<any> {
    const analysis = await this.aiEngine.performBusinessAnalysis(dataset);
    const recommendations = await this.generateBusinessRecommendations(dataset);
    const alerts = await this.generateSmartAlerts(dataset);

    return {
      overview: {
        totalRevenue: analysis.kpis.total_sales,
        totalOrders: analysis.kpis.total_orders,
        uniqueCustomers: analysis.kpis.unique_customers,
        growthRate: analysis.kpis.sales_growth_pct,
        healthScore: this.calculateBusinessHealthScore(analysis)
      },
      keyInsights: analysis.insights.slice(0, 5),
      topRecommendations: recommendations.slice(0, 3),
      criticalAlerts: alerts.filter(alert => alert.type === 'critical'),
      performanceMetrics: {
        customerRetention: analysis.kpis.repeat_customer_rate_pct,
        averageOrderValue: analysis.kpis.average_order_value,
        customerLifetimeValue: analysis.kpis.customer_lifetime_value,
        productDiversity: analysis.kpis.product_diversity
      },
      marketPosition: this.assessMarketPosition(analysis),
      riskAssessment: this.assessBusinessRisks(analysis),
      growthOpportunities: this.identifyGrowthOpportunities(analysis),
      generatedAt: new Date().toISOString()
    };
  }

  private calculateBusinessHealthScore(analysis: any): number {
    const { kpis } = analysis;
    let score = 0;
    let factors = 0;

    // Growth factor (30%)
    if (kpis.sales_growth_pct > 20) score += 30;
    else if (kpis.sales_growth_pct > 10) score += 20;
    else if (kpis.sales_growth_pct > 0) score += 10;
    factors += 30;

    // Customer retention factor (25%)
    if (kpis.repeat_customer_rate_pct > 40) score += 25;
    else if (kpis.repeat_customer_rate_pct > 25) score += 18;
    else if (kpis.repeat_customer_rate_pct > 15) score += 10;
    factors += 25;

    // Revenue stability factor (20%)
    if (kpis.momentum_score > 0.1) score += 20;
    else if (kpis.momentum_score > 0) score += 15;
    else if (kpis.momentum_score > -0.1) score += 10;
    factors += 20;

    // Customer value factor (15%)
    if (kpis.average_order_value > 100) score += 15;
    else if (kpis.average_order_value > 50) score += 10;
    else if (kpis.average_order_value > 25) score += 5;
    factors += 15;

    // Diversification factor (10%)
    if (kpis.product_diversity > 20) score += 10;
    else if (kpis.product_diversity > 10) score += 7;
    else if (kpis.product_diversity > 5) score += 4;
    factors += 10;

    return Math.round((score / factors) * 100);
  }

  private assessMarketPosition(analysis: any) {
    const { kpis } = analysis;
    
    let position = 'emerging';
    if (kpis.average_order_value > 150 && kpis.customer_lifetime_value > 300) {
      position = 'premium';
    } else if (kpis.total_orders > 1000 && kpis.sales_growth_pct > 15) {
      position = 'growth';
    } else if (kpis.repeat_customer_rate_pct > 35) {
      position = 'established';
    }

    return {
      category: position,
      strengths: this.identifyMarketStrengths(analysis),
      challenges: this.identifyMarketChallenges(analysis),
      competitiveAdvantage: this.identifyCompetitiveAdvantage(analysis)
    };
  }

  private assessBusinessRisks(analysis: any) {
    const risks = [];
    const { kpis, anomalies } = analysis;

    if (kpis.repeat_customer_rate_pct < 20) {
      risks.push({
        type: 'Customer Retention Risk',
        severity: 'high',
        description: 'Low repeat customer rate indicates potential churn issues'
      });
    }

    if (anomalies.length > 3) {
      risks.push({
        type: 'Market Volatility Risk',
        severity: 'medium',
        description: 'Multiple anomalies suggest unstable market conditions'
      });
    }

    if (kpis.sales_growth_pct < 0) {
      risks.push({
        type: 'Revenue Decline Risk',
        severity: 'critical',
        description: 'Negative growth trend requires immediate attention'
      });
    }

    return risks;
  }

  private identifyGrowthOpportunities(analysis: any) {
    const opportunities = [];
    const { kpis, timeseries } = analysis;

    if (kpis.average_order_value < 75) {
      opportunities.push({
        type: 'Order Value Optimization',
        potential: 'high',
        description: 'Significant opportunity to increase average order value through bundling and upselling'
      });
    }

    if (kpis.unique_customers < 500) {
      opportunities.push({
        type: 'Customer Acquisition',
        potential: 'high',
        description: 'Large addressable market for customer base expansion'
      });
    }

    if (timeseries.seasonality?.hasSeasonality) {
      opportunities.push({
        type: 'Seasonal Optimization',
        potential: 'medium',
        description: 'Leverage seasonal patterns for targeted marketing campaigns'
      });
    }

    return opportunities;
  }

  private identifyMarketStrengths(analysis: any): string[] {
    const strengths = [];
    const { kpis } = analysis;

    if (kpis.sales_growth_pct > 15) strengths.push('Strong revenue growth');
    if (kpis.repeat_customer_rate_pct > 30) strengths.push('Good customer loyalty');
    if (kpis.average_order_value > 100) strengths.push('High order values');
    if (kpis.product_diversity > 15) strengths.push('Diverse product portfolio');

    return strengths;
  }

  private identifyMarketChallenges(analysis: any): string[] {
    const challenges = [];
    const { kpis } = analysis;

    if (kpis.sales_growth_pct < 5) challenges.push('Slow growth rate');
    if (kpis.repeat_customer_rate_pct < 25) challenges.push('Customer retention issues');
    if (kpis.average_order_value < 50) challenges.push('Low order values');
    if (kpis.unique_customers < 200) challenges.push('Limited customer base');

    return challenges;
  }

  private identifyCompetitiveAdvantage(analysis: any): string {
    const { kpis } = analysis;

    if (kpis.customer_lifetime_value > 300) {
      return 'High customer lifetime value indicates strong brand loyalty and premium positioning';
    } else if (kpis.sales_growth_pct > 25) {
      return 'Rapid growth rate suggests strong market demand and effective execution';
    } else if (kpis.repeat_customer_rate_pct > 40) {
      return 'Excellent customer retention indicates superior product quality and service';
    } else {
      return 'Focus on developing unique value propositions to establish competitive differentiation';
    }
  }

  private getImpactScore(impact: string): number {
    switch (impact) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }
}

export const businessIntelligence = BusinessIntelligenceService.getInstance();